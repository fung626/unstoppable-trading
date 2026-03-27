<?php

namespace App\Jobs\Goods;

use App\Services\Goods\GoodsCsvImportService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ImportGoodsCsvRowJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    private $jobId;
    private $lineNo;
    private $row;
    private $options;

    public function __construct(string $jobId, int $lineNo, array $row, array $options = [])
    {
        $this->jobId = $jobId;
        $this->lineNo = $lineNo;
        $this->row = $row;
        $this->options = $options;
    }

    public function handle(GoodsCsvImportService $service): void
    {
        $delta = [
            'rows_skipped' => 0,
            'goods_created' => 0,
            'items_created' => 0,
            'suppliers_created' => 0,
            'sample_skip' => null,
        ];

        try {
            $delta = $service->importRow($this->row, $this->options);
        } catch (\Throwable $e) {
            Log::error('goods import row failed: ' . $e->getMessage(), [
                'job_id' => $this->jobId,
                'line' => $this->lineNo,
            ]);

            $delta['rows_skipped'] = 1;
            $delta['sample_skip'] = 'row processing failed: ' . $e->getMessage();
        }

        $this->applyDelta($delta);
    }

    private function applyDelta(array $delta): void
    {
        $payload = Cache::get($this->cacheKey(), []);
        if (empty($payload)) {
            return;
        }

        $summary = $payload['summary'] ?? [
            'rows_read' => 0,
            'rows_valid' => 0,
            'rows_skipped' => 0,
            'goods_created' => 0,
            'items_created' => 0,
            'suppliers_created' => 0,
            'sample_skips' => [],
        ];

        $summary['rows_skipped'] = (int) ($summary['rows_skipped'] ?? 0) + (int) ($delta['rows_skipped'] ?? 0);
        $summary['goods_created'] = (int) ($summary['goods_created'] ?? 0) + (int) ($delta['goods_created'] ?? 0);
        $summary['items_created'] = (int) ($summary['items_created'] ?? 0) + (int) ($delta['items_created'] ?? 0);
        $summary['suppliers_created'] = (int) ($summary['suppliers_created'] ?? 0) + (int) ($delta['suppliers_created'] ?? 0);

        if (!empty($delta['sample_skip']) && count($summary['sample_skips']) < 20) {
            $summary['sample_skips'][] = [
                'line' => $this->lineNo,
                'reason' => (string) $delta['sample_skip'],
            ];
        }

        $progress = $payload['progress'] ?? [
            'phase' => 'processing',
            'rows_read' => $summary['rows_read'] ?? 0,
            'rows_valid' => $summary['rows_valid'] ?? 0,
            'rows_processed' => 0,
            'percent' => 0,
        ];

        $progress['phase'] = 'processing';
        $progress['rows_read'] = (int) ($summary['rows_read'] ?? 0);
        $progress['rows_valid'] = (int) ($summary['rows_valid'] ?? 0);
        $progress['rows_processed'] = (int) ($progress['rows_processed'] ?? 0) + 1;

        $rowsValid = max(0, (int) ($summary['rows_valid'] ?? 0));
        $progress['percent'] = $rowsValid > 0
            ? round(($progress['rows_processed'] / $rowsValid) * 100, 2)
            : 100;

        $status = 'processing';
        $finishedAt = null;

        if ($rowsValid > 0 && $progress['rows_processed'] >= $rowsValid) {
            $status = 'completed';
            $finishedAt = now()->toDateTimeString();
            $progress['phase'] = 'completed';
            $progress['percent'] = 100;
        }

        $payload['status'] = $status;
        $payload['summary'] = $summary;
        $payload['progress'] = $progress;
        $payload['error'] = null;
        $payload['finished_at'] = $finishedAt;
        $payload['updated_at'] = now()->toDateTimeString();

        Cache::put($this->cacheKey(), $payload, now()->addDay());
        $this->updateJobsIndex($payload);
    }

    private function cacheKey(): string
    {
        return 'goods_import_job:' . $this->jobId;
    }

    private function jobsIndexKey(): string
    {
        return 'goods_import_jobs_index';
    }

    private function updateJobsIndex(array $payload): void
    {
        $index = Cache::get($this->jobsIndexKey(), []);

        $index[$this->jobId] = [
            'job_id' => $payload['job_id'] ?? $this->jobId,
            'status' => $payload['status'] ?? 'processing',
            'user_id' => $payload['user_id'] ?? null,
            'filename' => $payload['filename'] ?? null,
            'created_at' => $payload['created_at'] ?? null,
            'updated_at' => $payload['updated_at'] ?? null,
            'finished_at' => $payload['finished_at'] ?? null,
        ];

        Cache::put($this->jobsIndexKey(), $index, now()->addDay());
    }
}