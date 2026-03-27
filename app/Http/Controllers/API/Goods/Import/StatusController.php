<?php

namespace App\Http\Controllers\API\Goods\Import;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class StatusController extends Controller
{
    public function get(string $jobId)
    {
        $payload = Cache::get($this->cacheKey($jobId));
        if (!$payload) {
            $response = config('response.common.fail.parameter');
            $response['msg'] = 'job not found';
            $response['data'] = ['job_id' => $jobId];
            return response()->json($response, 404);
        }
        $response = config('response.common.success');
        $response['data'] = $payload;
        return response()->json($response, 200);
    }

    private function cacheKey(string $jobId): string
    {
        return 'goods_import_job:' . $jobId;
    }
}