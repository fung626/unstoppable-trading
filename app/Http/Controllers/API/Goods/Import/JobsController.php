<?php

namespace App\Http\Controllers\API\Goods\Import;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class JobsController extends Controller
{
    public function get(Request $request)
    {
        $userId = optional(Auth::user())->id;
        $statusFilter = $request->input('status');
        $index = Cache::get($this->jobsIndexKey(), []);
        $jobs = [];

        foreach ($index as $meta) {
            if (($meta['user_id'] ?? null) !== $userId) {
                continue;
            }

            if ($statusFilter && ($meta['status'] ?? null) !== $statusFilter) {
                continue;
            }

            $payload = Cache::get($this->cacheKey((string) $meta['job_id']));
            if (!$payload) {
                continue;
            }

            $jobs[] = $payload;
        }

        usort($jobs, function (array $a, array $b): int {
            return strcmp((string) ($b['updated_at'] ?? ''), (string) ($a['updated_at'] ?? ''));
        });

        $response = config('response.common.success');
        $response['data'] = $jobs;

        return response()->json($response, 200);
    }

    private function cacheKey(string $jobId): string
    {
        return 'goods_import_job:' . $jobId;
    }

    private function jobsIndexKey(): string
    {
        return 'goods_import_jobs_index';
    }
}