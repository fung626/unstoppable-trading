<?php

namespace App\Jobs\Goods;

use App\Mylibs\ImportJobCacheHelper;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Goods\Goods;
use App\Models\Goods\Item as GoodsItem;
use App\Models\Goods\Stock\Stock as GoodsStock;

class ImportGoodsCsvJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public $timeout = 0;

    private $jobId;
    private $storedPath;
    private $options;

    public function __construct(string $jobId, string $storedPath, array $options = [])
    {
        $this->jobId = $jobId;
        $this->storedPath = $storedPath;
        $this->options = $options;
    }

    private const HEADER_INDEX = [
        'number' => 0,
        'supplier_number' => 1,
        'code' => 2,
    ];

    private const DEFAULT_MISSING_FILE_MAX_RETRIES = 3;
    private const DEFAULT_MISSING_FILE_RETRY_DELAY_SECONDS = 20;

    public function handle(ImportJobCacheHelper $jobCache): void
    {
        $this->updateJobPayload([
            'status' => 'processing',
            'started_at' => now()->toDateTimeString(),
            'finished_at' => null,
            'summary' => null,
            'error' => null,
            'progress' => [
                'phase' => 'reading',
                'rows_read' => 0,
                'rows_valid' => 0,
                'rows_processed' => 0,
                'percent' => 0,
            ],
        ], $jobCache);

        try {
            $mode = (string) ($this->options['mode'] ?? 'append');
            $absolutePath = storage_path('app/' . $this->storedPath);
            $filename = (string) ($this->options['filename'] ?? basename($absolutePath));

            $handle = $this->openCsvHandleOrRetry($absolutePath, $filename, $jobCache);
            if ($handle === null) {
                // Retry was scheduled for transient missing-file case.
                return;
            }
            
            // Clear existing data if mode is 'replace'
            if ($mode === 'replace') {
                try {
                    GoodsStock::truncate();
                    GoodsItem::truncate();
                    Goods::truncate();
                } catch (\Throwable $e) {
                    throw new \RuntimeException('failed to clear existing goods data: ' . $e->getMessage());
                }
            }

            $limit = isset($this->options['limit']) ? (int) $this->options['limit'] : null;

            $summary = [
                'filename' => $filename,
                'mode' => $mode,
                'dry_run' => (bool) ($this->options['dry_run'] ?? false),
                'rows_read' => 0,
                'rows_valid' => 0,
                'rows_skipped' => 0,
                'goods_created' => 0,
                'items_created' => 0,
                'suppliers_created' => 0,
                'sample_skips' => [],
            ];

            $line = 0;
            while (($raw = fgetcsv($handle, 0, ',', '"', '\\')) !== false) {
                $line++;
                if ($line === 1) {
                    continue;
                }

                if ($limit && $summary['rows_valid'] >= $limit) {
                    break;
                }

                $summary['rows_read']++;
                $row = $this->normalizeRow($raw);
                if (!$this->isImportableRow($row)) {
                    $summary['rows_skipped']++;
                    if (count($summary['sample_skips']) < 20) {
                        $summary['sample_skips'][] = [
                            'line' => $line,
                            'reason' => 'missing required values',
                        ];
                    }
                    continue;
                }

                $summary['rows_valid']++;
                ImportGoodsCsvRowJob::dispatch(
                    $this->jobId,
                    $line,
                    array_slice($row, 0, 20),
                    $this->options
                );
            }

            fclose($handle);

            if ($summary['rows_valid'] === 0) {
                $this->updateJobPayload([
                    'status' => 'completed',
                    'finished_at' => now()->toDateTimeString(),
                    'summary' => $summary,
                    'error' => null,
                    'progress' => [
                        'phase' => 'completed',
                        'rows_read' => $summary['rows_read'],
                        'rows_valid' => 0,
                        'rows_processed' => 0,
                        'percent' => 100,
                    ],
                ], $jobCache);
                return;
            }

            $this->updateJobPayload([
                'status' => 'processing',
                'finished_at' => null,
                'summary' => $summary,
                'error' => null,
                'progress' => [
                    'phase' => 'processing',
                    'rows_read' => $summary['rows_read'] ?? 0,
                    'rows_valid' => $summary['rows_valid'] ?? 0,
                    'rows_processed' => 0,
                    'percent' => 0,
                ],
            ], $jobCache);
        } catch (\Throwable $e) {
            Log::error('goods import job failed: ' . $e->getMessage());
            $this->updateJobPayload([
                'status' => 'failed',
                'finished_at' => now()->toDateTimeString(),
                'summary' => null,
                'error' => $e->getMessage(),
            ], $jobCache);
            throw $e;
        }
    }

    /**
     * @return resource|null
     */
    private function openCsvHandleOrRetry(string $absolutePath, string $filename, ImportJobCacheHelper $jobCache)
    {
        if (!file_exists($absolutePath) || !is_file($absolutePath)) {
            return $this->handleMissingCsvPath($absolutePath, $filename, 'csv file does not exist', $jobCache);
        }

        if (!is_readable($absolutePath)) {
            return $this->handleMissingCsvPath($absolutePath, $filename, 'csv file is not readable', $jobCache);
        }

        $handle = @fopen($absolutePath, 'r');
        if ($handle === false) {
            $lastError = error_get_last();
            $reason = $lastError['message'] ?? 'failed to open csv stream';
            return $this->handleMissingCsvPath($absolutePath, $filename, $reason, $jobCache);
        }

        return $handle;
    }

    /**
     * @return null
     */
    private function handleMissingCsvPath(string $absolutePath, string $filename, string $reason, ImportJobCacheHelper $jobCache)
    {
        $retryOnMissingFile = filter_var($this->options['retry_missing_file'] ?? true, FILTER_VALIDATE_BOOLEAN);
        $maxRetries = max(0, (int) ($this->options['missing_file_max_retries'] ?? self::DEFAULT_MISSING_FILE_MAX_RETRIES));
        $baseDelay = max(1, (int) ($this->options['missing_file_retry_delay_seconds'] ?? self::DEFAULT_MISSING_FILE_RETRY_DELAY_SECONDS));
        $attempt = method_exists($this, 'attempts') ? (int) $this->attempts() : 1;

        $message = sprintf(
            'csv source unavailable for "%s" at path "%s": %s',
            $filename,
            $absolutePath,
            $reason
        );

        if ($retryOnMissingFile && $attempt <= $maxRetries) {
            $delay = min(300, $baseDelay * $attempt);

            $this->updateJobPayload([
                'status' => 'queued',
                'error' => sprintf('%s (retry %d/%d in %ds)', $message, $attempt, $maxRetries, $delay),
                'progress' => [
                    'phase' => 'reading',
                    'rows_read' => 0,
                    'rows_valid' => 0,
                    'rows_processed' => 0,
                    'percent' => 0,
                ],
            ], $jobCache);

            if ($this->job) {
                $this->job->release($delay);
            }

            Log::warning('goods import csv source missing, retry scheduled', [
                'job_id' => $this->jobId,
                'attempt' => $attempt,
                'max_retries' => $maxRetries,
                'delay_seconds' => $delay,
                'path' => $absolutePath,
                'reason' => $reason,
            ]);

            return null;
        }

        throw new \RuntimeException($message);
    }

    private function updateJobPayload(array $changes, ImportJobCacheHelper $jobCache): void
    {
        $key = $jobCache->cacheKey($this->jobId);
        $existing = $jobCache->safeGet($key, []);
        $now = now()->toDateTimeString();

        $payload = array_merge([
            'job_id' => $this->jobId,
            'status' => 'queued',
            'user_id' => $this->options['user_id'] ?? null,
            'filename' => $this->options['filename'] ?? null,
            'dry_run' => (bool) ($this->options['dry_run'] ?? false),
            'created_at' => $now,
            'started_at' => null,
            'finished_at' => null,
            'updated_at' => $now,
            'summary' => null,
            'error' => null,
            'progress' => [
                'phase' => 'queued',
                'rows_read' => 0,
                'rows_valid' => 0,
                'rows_processed' => 0,
                'percent' => 0,
            ],
        ], $existing, $changes);

        $payload['updated_at'] = $now;

        $jobCache->safePut($key, $payload, now()->addDay());
        $this->updateJobsIndex($payload, $jobCache);
    }

    private function normalizeRow(array $row): array
    {
        return array_map(function ($value) {
            return trim((string) $value);
        }, $row);
    }

    private function cell(array $row, string $key): string
    {
        $index = self::HEADER_INDEX[$key];
        return isset($row[$index]) ? trim((string) $row[$index]) : '';
    }

    private function isImportableRow(array $row): bool
    {
        $number = $this->cell($row, 'number');
        $supplier = $this->cell($row, 'supplier_number');
        $code = $this->cell($row, 'code');

        if ($number === '' || !is_numeric($number)) {
            return false;
        }

        return $supplier !== '' && $code !== '';
    }

    private function updateJobsIndex(array $payload, ImportJobCacheHelper $jobCache): void
    {
        $index = $jobCache->safeGet($jobCache->jobsIndexKey(), []);

        $index[$this->jobId] = [
            'job_id' => $payload['job_id'] ?? $this->jobId,
            'status' => $payload['status'] ?? 'queued',
            'user_id' => $payload['user_id'] ?? null,
            'filename' => $payload['filename'] ?? null,
            'created_at' => $payload['created_at'] ?? null,
            'updated_at' => $payload['updated_at'] ?? null,
            'finished_at' => $payload['finished_at'] ?? null,
        ];

        $jobCache->safePut($jobCache->jobsIndexKey(), $index, now()->addDay());
    }
}