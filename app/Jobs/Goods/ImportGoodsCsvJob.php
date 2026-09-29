<?php
namespace App\Jobs\Goods;

use App\Mylibs\ImportJobCacheHelper;
use App\Services\Goods\GoodsCsvImportService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ImportGoodsCsvJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public $timeout = 0; // Allow long-running bulk import

    private string $jobId;
    private string $storedPath;
    private array $options;

    public function __construct(string $jobId, string $storedPath, array $options = [])
    {
        $this->jobId      = $jobId;
        $this->storedPath = $storedPath;
        $this->options    = $options;
    }

    public function handle(GoodsCsvImportService $service, ImportJobCacheHelper $jobCache): void
    {
        $absolutePath = storage_path('app/' . $this->storedPath);
        $filename     = (string) ($this->options['filename'] ?? basename($absolutePath));

        if (! file_exists($absolutePath) || ! is_readable($absolutePath)) {
            $this->updateJobPayload([
                'status'      => 'failed',
                'finished_at' => now()->toDateTimeString(),
                'error'       => "csv file not found or unreadable at: {$absolutePath}",
            ], $jobCache);
            return;
        }

        // Mark job as processing
        $this->updateJobPayload([
            'status'      => 'processing',
            'started_at'  => now()->toDateTimeString(),
            'finished_at' => null,
            'error'       => null,
            'progress'    => [
                'phase'          => 'reading',
                'rows_read'      => 0,
                'rows_valid'     => 0,
                'rows_processed' => 0,
                'percent'        => 0,
            ],
        ], $jobCache);

        try {
            // Merge options with job context
            $importOptions = array_merge($this->options, [
                'filename'    => $filename,
                'user_id'     => $this->options['user_id'] ?? null,
                'on_progress' => function (array $progressData) use ($jobCache) {
                    // Real-time progress updates from the service
                    $this->updateJobPayload([
                        'status'   => $progressData['phase'] === 'completed' ? 'completed' : 'processing',
                        'progress' => $progressData,
                    ], $jobCache);
                },
            ]);

            // Execute the bulk import service directly
            $summary = $service->import($absolutePath, $importOptions);

            // Mark completed successfully
            $this->updateJobPayload([
                'status'      => 'completed',
                'finished_at' => now()->toDateTimeString(),
                'summary'     => $summary,
                'error'       => null,
                'progress'    => [
                    'phase'          => 'completed',
                    'rows_read'      => $summary['rows_read'],
                    'rows_valid'     => $summary['rows_valid'],
                    'rows_processed' => $summary['rows_valid'],
                    'percent'        => 100,
                ],
            ], $jobCache);

        } catch (\Throwable $e) {
            Log::error('goods import job failed: ' . $e->getMessage(), [
                'job_id'    => $this->jobId,
                'exception' => $e,
            ]);

            $this->updateJobPayload([
                'status'      => 'failed',
                'finished_at' => now()->toDateTimeString(),
                'error'       => $e->getMessage(),
                'progress'    => [
                    'phase' => 'failed',
                ],
            ], $jobCache);

            throw $e;
        }
    }

    private function updateJobPayload(array $changes, ImportJobCacheHelper $jobCache): void
    {
        $key      = $jobCache->cacheKey($this->jobId);
        $existing = $jobCache->safeGet($key, []);
        $now      = now()->toDateTimeString();

        $summary = $existing['summary'] ?? null;
        if (isset($changes['summary'])) {
            if ($summary && is_array($summary) && isset($summary['sample_skips'], $changes['summary']['sample_skips'])) {
                $mergedSkips                        = array_merge($summary['sample_skips'], $changes['summary']['sample_skips']);
                $changes['summary']['sample_skips'] = array_slice($mergedSkips, 0, 20);
            }
            $summary = array_merge($summary ?? [], $changes['summary']);
        }

        $payload = array_merge([
            'job_id'      => $this->jobId,
            'status'      => 'queued',
            'user_id'     => $this->options['user_id'] ?? null,
            'filename'    => $this->options['filename'] ?? null,
            'dry_run'     => (bool) ($this->options['dry_run'] ?? false),
            'created_at'  => $now,
            'started_at'  => null,
            'finished_at' => null,
            'updated_at'  => $now,
            'summary'     => null,
            'error'       => null,
            'progress'    => [
                'phase'          => 'queued',
                'rows_read'      => 0,
                'rows_valid'     => 0,
                'rows_processed' => 0,
                'percent'        => 0,
            ],
        ], $existing, $changes);

        if ($summary !== null) {
            $payload['summary'] = $summary;
        }

        $payload['updated_at'] = $now;

        $jobCache->safePut($key, $payload, now()->addDay());
        $this->updateJobsIndex($payload, $jobCache);
    }

    private function updateJobsIndex(array $payload, ImportJobCacheHelper $jobCache): void
    {
        $index = $jobCache->safeGet($jobCache->jobsIndexKey(), []);

        $index[$this->jobId] = [
            'job_id'      => $payload['job_id'] ?? $this->jobId,
            'status'      => $payload['status'] ?? 'queued',
            'user_id'     => $payload['user_id'] ?? null,
            'filename'    => $payload['filename'] ?? null,
            'created_at'  => $payload['created_at'] ?? null,
            'updated_at'  => $payload['updated_at'] ?? null,
            'finished_at' => $payload['finished_at'] ?? null,
        ];

        $jobCache->safePut($jobCache->jobsIndexKey(), $index, now()->addDay());
    }
}