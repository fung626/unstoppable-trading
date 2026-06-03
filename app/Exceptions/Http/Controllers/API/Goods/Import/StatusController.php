<?php

namespace App\Http\Controllers\API\Goods\Import;

use App\Http\Controllers\Controller;
use App\Mylibs\ImportJobCacheHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StatusController extends Controller
{
    public function get(Request $request, ImportJobCacheHelper $jobCache)
    {
        $userId = optional(Auth::user())->id;
        $statusFilter = $request->input('status');
        $index = $jobCache->getJobsIndex();
        $jobs = [];

        foreach ($index as $meta) {
            if (($meta['user_id'] ?? null) !== $userId) {
                continue;
            }

            if ($statusFilter && ($meta['status'] ?? null) !== $statusFilter) {
                continue;
            }

            $jobId = (string) ($meta['job_id'] ?? '');
            if ($jobId === '') {
                continue;
            }

            $payload = $jobCache->getJob($jobId);
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

    public function details(string $jobId, ImportJobCacheHelper $jobCache)
    {
        $payload = $jobCache->getJob($jobId);
        $userId = optional(Auth::user())->id;

        if (!$payload || ($payload['user_id'] ?? null) !== $userId) {
            $response = config('response.common.fail.parameter');
            $response['msg'] = 'job not found';
            $response['data'] = ['job_id' => $jobId];
            return response()->json($response, 404);
        }

        $response = config('response.common.success');
        $response['data'] = $payload;
        return response()->json($response, 200);
    }
}