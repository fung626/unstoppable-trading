<?php

namespace App\Console\Commands\Goods;

use App\Mylibs\ImportJobCacheHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class CheckImportJobsStale extends Command
{
    private const ROW_JOB_CLASS = 'App\\Jobs\\Goods\\ImportGoodsCsvRowJob';


    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'goods:import:reconcile-jobs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reconcile goods import jobs by queue state and mark terminal status';

    public function handle(ImportJobCacheHelper $jobCache)
    {
        $index = $jobCache->getJobsIndex();
        $checked = 0;
        $markedFailed = 0;
        $finalizedCompleted = 0;
        $skippedPending = 0;

        foreach ($index as $jobId => $meta) {
            $jobId = (string) ($meta['job_id'] ?? $jobId);
            if ($jobId === '') {
                continue;
            }

            $payload = $jobCache->getJob($jobId);
            if (!$payload) {
                continue;
            }

            $checked++;
            $status = (string) ($payload['status'] ?? '');
            if (!in_array($status, ['queued', 'processing'], true)) {
                continue;
            }

            $summary = (array) ($payload['summary'] ?? []);
            $progress = (array) ($payload['progress'] ?? []);

            $pendingRowJobs = $this->countPendingRowJobs($jobId);
            $failedRowJobs = $this->countFailedRowJobs($jobId);

            // If queue state cannot be reliably read, do not force a terminal status.
            if ($pendingRowJobs < 0 || $failedRowJobs < 0) {
                continue;
            }

            // Only finalize after all row jobs have drained from the queue.
            if ($pendingRowJobs > 0) {
                $skippedPending++;
                continue;
            }

            if ($pendingRowJobs === 0 && $failedRowJobs === 0 && !empty($summary)) {
                $rowsValid = (int) ($summary['rows_valid'] ?? 0);
                $rowsRead = (int) ($summary['rows_read'] ?? 0);
                $rowsProcessed = (int) ($progress['rows_processed'] ?? 0);

                if ($rowsValid > 0 && $rowsProcessed < $rowsValid) {
                    $now = now()->toDateTimeString();
                    $payload['status'] = 'failed';
                    $payload['finished_at'] = $now;
                    $payload['updated_at'] = $now;
                    $payload['error'] = sprintf(
                        'queue drained but processed rows mismatch (%d/%d)',
                        $rowsProcessed,
                        $rowsValid
                    );
                    $payload['progress'] = array_merge([
                        'phase' => 'failed',
                        'rows_read' => $rowsRead,
                        'rows_valid' => $rowsValid,
                        'rows_processed' => $rowsProcessed,
                        'percent' => $rowsValid > 0 ? round(($rowsProcessed / $rowsValid) * 100, 2) : 0,
                    ], $progress, [
                        'phase' => 'failed',
                        'rows_read' => $rowsRead,
                        'rows_valid' => $rowsValid,
                        'rows_processed' => $rowsProcessed,
                        'percent' => $rowsValid > 0 ? round(($rowsProcessed / $rowsValid) * 100, 2) : 0,
                    ]);

                    Cache::put($jobCache->cacheKey($jobId), $payload, now()->addDay());

                    if (isset($index[$jobId]) && is_array($index[$jobId])) {
                        $index[$jobId]['status'] = 'failed';
                        $index[$jobId]['updated_at'] = $now;
                        $index[$jobId]['finished_at'] = $now;
                    }

                    $markedFailed++;
                    continue;
                }

                $now = now()->toDateTimeString();
                $payload['status'] = 'completed';
                $payload['finished_at'] = $now;
                $payload['updated_at'] = $now;
                $payload['error'] = null;
                $payload['progress'] = array_merge([
                    'phase' => 'completed',
                    'rows_read' => $rowsRead,
                    'rows_valid' => $rowsValid,
                    'rows_processed' => $rowsProcessed,
                    'percent' => $rowsValid > 0 ? round(($rowsProcessed / $rowsValid) * 100, 2) : 100,
                ], $progress, [
                    'phase' => 'completed',
                    'rows_read' => $rowsRead,
                    'rows_valid' => $rowsValid,
                    'rows_processed' => $rowsProcessed,
                    'percent' => 100,
                ]);

                Cache::put($jobCache->cacheKey($jobId), $payload, now()->addDay());

                if (isset($index[$jobId]) && is_array($index[$jobId])) {
                    $index[$jobId]['status'] = 'completed';
                    $index[$jobId]['updated_at'] = $now;
                    $index[$jobId]['finished_at'] = $now;
                }

                $finalizedCompleted++;
                continue;
            }

            if ($failedRowJobs === 0 && empty($summary)) {
                // Reader stage likely failed before summary was prepared; keep existing state.
                continue;
            }

            $now = now()->toDateTimeString();
            $payload['status'] = 'failed';
            $payload['finished_at'] = $now;
            $payload['updated_at'] = $now;
            $payload['error'] = $payload['error'] ?? sprintf(
                'job stalled or worker stopped (pending row jobs: %d, failed row jobs: %d)',
                $pendingRowJobs,
                $failedRowJobs
            );
            $payload['progress'] = array_merge([
                'phase' => 'failed',
                'rows_read' => 0,
                'rows_valid' => 0,
                'rows_processed' => 0,
                'percent' => 0,
            ], (array) ($payload['progress'] ?? []), [
                'phase' => 'failed',
            ]);

            Cache::put($jobCache->cacheKey($jobId), $payload, now()->addDay());

            if (isset($index[$jobId]) && is_array($index[$jobId])) {
                $index[$jobId]['status'] = 'failed';
                $index[$jobId]['updated_at'] = $now;
                $index[$jobId]['finished_at'] = $now;
            }

            $markedFailed++;
        }

        Cache::put($jobCache->jobsIndexKey(), $index, now()->addDay());

        $this->info("checked: {$checked}, completed: {$finalizedCompleted}, marked failed: {$markedFailed}, skipped pending: {$skippedPending}");
        return 0;
    }

    private function countPendingRowJobs(string $jobId): int
    {
        if (config('queue.default') !== 'database') {
            return -1;
        }

        try {
            $displayNameFragment = $this->rowJobDisplayNameJsonFragment();
            return (int) DB::table('jobs')
                ->where('payload', 'like', '%' . $displayNameFragment . '%')
                ->where('payload', 'like', '%"' . $jobId . '"%')
                ->count();
        } catch (\Throwable $e) {
            return -1;
        }
    }

    private function countFailedRowJobs(string $jobId): int
    {
        if (config('queue.default') !== 'database') {
            return -1;
        }

        try {
            $displayNameFragment = $this->rowJobDisplayNameJsonFragment();
            return (int) DB::table('failed_jobs')
                ->where('payload', 'like', '%' . $displayNameFragment . '%')
                ->where('payload', 'like', '%"' . $jobId . '"%')
                ->count();
        } catch (\Throwable $e) {
            return -1;
        }
    }

    private function rowJobDisplayNameJsonFragment(): string
    {
        return '"displayName":"' . str_replace('\\', '\\\\', self::ROW_JOB_CLASS) . '"';
    }
}