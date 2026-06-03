<?php

namespace App\Mylibs;

class ImportJobCacheHelper
{
    public function lockKey(string $jobId): string
    {
        return 'goods_import_job_lock:' . $jobId;
    }

    public function cacheKey(string $jobId): string
    {
        return 'goods_import_job:' . $jobId;
    }

    public function rowProcessedKey(string $jobId, int $lineNo): string
    {
        return 'goods_import_job_row_processed:' . $jobId . ':' . $lineNo;
    }

    public function jobsIndexKey(): string
    {
        return 'goods_import_jobs_index';
    }

    public function getJobsIndex(): array
    {
        $value = $this->safeGet($this->jobsIndexKey(), []);
        return is_array($value) ? $value : [];
    }

    public function getJob(string $jobId): ?array
    {
        $payload = $this->safeGet($this->cacheKey($jobId));
        return is_array($payload) ? $payload : null;
    }

    public function upsertJobsIndex(array $meta): void
    {
        $index = $this->getJobsIndex();
        $jobId = (string) ($meta['job_id'] ?? '');
        if ($jobId === '') {
            return;
        }

        $index[$jobId] = $meta;
        $this->safePut($this->jobsIndexKey(), $index, now()->addDay());
    }

    public function findActiveJob(): ?array
    {
        $index = $this->getJobsIndex();

        foreach ($index as $meta) {
            $jobId = (string) ($meta['job_id'] ?? '');
            if ($jobId === '') {
                continue;
            }

            $payload = $this->getJob($jobId);
            if (!$payload) {
                continue;
            }

            $status = (string) ($payload['status'] ?? '');
            if (in_array($status, ['queued', 'processing'], true)) {
                return $payload;
            }
        }

        return null;
    }

    public function safeGet(string $key, $default = null)
    {
        return SafeCache::get($key, $default);
    }

    public function safePut(string $key, $value, $ttl = null): bool
    {
        return SafeCache::put($key, $value, $ttl);
    }

    public function safeAdd(string $key, $value, $ttl = null): bool
    {
        return SafeCache::add($key, $value, $ttl);
    }

    public function safeForget(string $key): bool
    {
        return SafeCache::forget($key);
    }
}