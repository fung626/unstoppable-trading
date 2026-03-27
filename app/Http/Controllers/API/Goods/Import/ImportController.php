<?php

namespace App\Http\Controllers\API\Goods\Import;

use App\Http\Controllers\Controller;
use App\Jobs\Goods\ImportGoodsCsvJob;
use App\Services\Goods\GoodsCsvImportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ImportController extends Controller
{
    public function post(Request $request, GoodsCsvImportService $service)
    {
        // return response()->json(array_merge($request->all(), $request->allFiles()), 400);
        $validator = Validator::make(
            array_merge($request->all(), $request->allFiles()),
            [
                'file' => 'required|file|max:51200',
                'dry_run' => 'nullable',
                'limit' => 'nullable|integer|min:1',
                'async' => 'nullable',
            ]
        );

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $uploadedFile = $request->file('file');
        if (!$uploadedFile) {
            $response = config('response.common.fail.parameter');
            $response['msg'] = 'uploaded csv file not found';
            $response['data'] = ['file' => 'invalid upload'];
            return response()->json($response, 400);
        }

        $storedPath = $uploadedFile->storeAs(
            'imports/goods',
            now()->format('YmdHis') . '-' . Str::uuid() . '.csv'
        );

        if (!$storedPath) {
            $response = config('response.common.fail.database');
            $response['msg'] = 'failed to store upload';
            return response()->json($response, 500);
        }

        $dryRun = filter_var($request->input('dry_run', false), FILTER_VALIDATE_BOOLEAN);
        $limit = $request->filled('limit') ? (int) $request->input('limit') : null;
        $async = filter_var($request->input('async', true), FILTER_VALIDATE_BOOLEAN);
        $userId = optional(Auth::user())->id;

        $options = [
            'dry_run' => $dryRun,
            'limit' => $limit,
            'user_id' => $userId,
            'filename' => $uploadedFile->getClientOriginalName(),
        ];

        if (!$async) {
            try {
                $summary = $service->import(storage_path('app/' . $storedPath), $options);
                $response = config('response.common.success');
                $response['msg'] = $dryRun ? 'dry run completed' : 'import completed';
                $response['data'] = $summary;
                return response()->json($response, 200);
            } catch (\Throwable $e) {
                Log::error('goods import failed: ' . $e->getMessage());
                $response = config('response.common.fail.database');
                $response['msg'] = $e->getMessage();
                return response()->json($response, 500);
            }
        }

        $jobId = (string) Str::uuid();
        Cache::put($this->cacheKey($jobId), [
            'job_id' => $jobId,
            'status' => 'queued',
            'user_id' => $userId,
            'filename' => $uploadedFile->getClientOriginalName(),
            'dry_run' => $dryRun,
            'created_at' => now()->toDateTimeString(),
            'started_at' => null,
            'finished_at' => null,
            'updated_at' => now()->toDateTimeString(),
            'summary' => null,
            'error' => null,
            'progress' => [
                'phase' => 'queued',
                'rows_read' => 0,
                'rows_valid' => 0,
                'rows_processed' => 0,
                'percent' => 0,
            ],
        ], now()->addDay());

        $this->upsertJobsIndex([
            'job_id' => $jobId,
            'status' => 'queued',
            'user_id' => $userId,
            'filename' => $uploadedFile->getClientOriginalName(),
            'created_at' => now()->toDateTimeString(),
            'updated_at' => now()->toDateTimeString(),
            'finished_at' => null,
        ]);

        ImportGoodsCsvJob::dispatch($jobId, $storedPath, $options);

        $response = config('response.common.success');
        // $response['msg'] = 'import queued';
        $response['data'] = [
            'job_id' => $jobId,
            'status' => 'queued',
            'status_endpoint' => 'api/goods/import/status/' . $jobId,
        ];

        return response()->json($response, 202);
    }

    private function cacheKey(string $jobId): string
    {
        return 'goods_import_job:' . $jobId;
    }

    private function jobsIndexKey(): string
    {
        return 'goods_import_jobs_index';
    }

    private function upsertJobsIndex(array $meta): void
    {
        $index = Cache::get($this->jobsIndexKey(), []);
        $jobId = (string) $meta['job_id'];
        $index[$jobId] = $meta;

        Cache::put($this->jobsIndexKey(), $index, now()->addDay());
    }
}