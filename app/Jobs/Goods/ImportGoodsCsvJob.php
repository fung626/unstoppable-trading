<?php

namespace App\Jobs\Goods;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

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

    public function handle(): void
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
        ]);

        try {
            $absolutePath = storage_path('app/' . $this->storedPath);
            $limit = isset($this->options['limit']) ? (int) $this->options['limit'] : null;
            $filename = (string) ($this->options['filename'] ?? basename($absolutePath));
            $handle = fopen($absolutePath, 'r');
            if ($handle === false) {
                throw new \RuntimeException('unable to open csv');
            }

            $summary = [
                'filename' => $filename,
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
                ]);
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
            ]);
        } catch (\Throwable $e) {
            Log::error('goods import job failed: ' . $e->getMessage());
            $this->updateJobPayload([
                'status' => 'failed',
                'finished_at' => now()->toDateTimeString(),
                'summary' => null,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    private function cacheKey(): string
    {
        return 'goods_import_job:' . $this->jobId;
    }

    private function jobsIndexKey(): string
    {
        return 'goods_import_jobs_index';
    }

    private function updateJobPayload(array $changes): void
    {
        $key = $this->cacheKey();
        $existing = Cache::get($key, []);
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

        Cache::put($key, $payload, now()->addDay());
        $this->updateJobsIndex($payload);
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

    private function updateJobsIndex(array $payload): void
    {
        $index = Cache::get($this->jobsIndexKey(), []);

        $index[$this->jobId] = [
            'job_id' => $payload['job_id'] ?? $this->jobId,
            'status' => $payload['status'] ?? 'queued',
            'user_id' => $payload['user_id'] ?? null,
            'filename' => $payload['filename'] ?? null,
            'created_at' => $payload['created_at'] ?? null,
            'updated_at' => $payload['updated_at'] ?? null,
            'finished_at' => $payload['finished_at'] ?? null,
        ];

        Cache::put($this->jobsIndexKey(), $index, now()->addDay());
    }
}