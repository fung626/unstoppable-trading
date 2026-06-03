<?php

namespace App\Http\Controllers\API\Goods\Import;

use App\Http\Controllers\Controller;
use App\Jobs\Goods\ImportGoodsCsvJob;
use App\Services\Goods\GoodsCsvImportService;
use App\Mylibs\ImportJobCacheHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ImportController extends Controller
{
    private ImportJobCacheHelper $jobCache;

    public function __construct(ImportJobCacheHelper $jobCache)
    {
        $this->jobCache = $jobCache;
    }

    public function post(Request $request, GoodsCsvImportService $service)
    {
        // return response()->json(array_merge($request->all(), $request->allFiles()), 400);
        $validator = Validator::make(
            array_merge($request->all(), $request->allFiles()),
            [
                'file' => 'required|file|max:51200',
                'mode' => 'required|in:replace,append',
                'dry_run' => 'nullable',
                'limit' => 'nullable|integer|min:1',
                'async' => 'nullable',
                'retry_missing_file' => 'nullable',
                'missing_file_max_retries' => 'nullable|integer|min:0|max:20',
                'missing_file_retry_delay_seconds' => 'nullable|integer|min:1|max:600',
                
            ]
        );

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $activeJob = $this->jobCache->findActiveJob();
        if ($activeJob) {
            $response = config('response.common.fail.parameter');
            $response['msg'] = 'goods import already in progress';
            $response['data'] = $activeJob;
            return response()->json($response, 409);
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
        $mode = $request->input('mode', 'append');
        $userId = optional(Auth::user())->id;

        $options = [
            'dry_run' => $dryRun,
            'limit' => $limit,
            'mode' => $mode,
            'user_id' => $userId,
            'filename' => $uploadedFile->getClientOriginalName(),
            'retry_missing_file' => $request->input('retry_missing_file', true),
            'missing_file_max_retries' => $request->input('missing_file_max_retries', 3),
            'missing_file_retry_delay_seconds' => $request->input('missing_file_retry_delay_seconds', 20),
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
        $this->jobCache->safePut($this->jobCache->cacheKey($jobId), [
            'job_id' => $jobId,
            'status' => 'queued',
            'user_id' => $userId,
            'filename' => $uploadedFile->getClientOriginalName(),
            'mode' => $mode,
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

        $this->jobCache->upsertJobsIndex([
            'job_id' => $jobId,
            'status' => 'queued',
            'user_id' => $userId,
            'filename' => $uploadedFile->getClientOriginalName(),
            'mode' => $mode,
            'created_at' => now()->toDateTimeString(),
            'updated_at' => now()->toDateTimeString(),
            'finished_at' => null,
        ]);

        try {
            ImportGoodsCsvJob::dispatch($jobId, $storedPath, $options);
        } catch (\Throwable $e) {
            Log::error('goods import enqueue failed: ' . $e->getMessage());
            $this->jobCache->safePut($this->jobCache->cacheKey($jobId), [
                'job_id' => $jobId,
                'status' => 'failed',
                'user_id' => $userId,
                'filename' => $uploadedFile->getClientOriginalName(),
                'mode' => $mode,
                'dry_run' => $dryRun,
                'created_at' => now()->toDateTimeString(),
                'started_at' => null,
                'finished_at' => now()->toDateTimeString(),
                'updated_at' => now()->toDateTimeString(),
                'summary' => null,
                'error' => $e->getMessage(),
                'progress' => [
                    'phase' => 'failed',
                    'rows_read' => 0,
                    'rows_valid' => 0,
                    'rows_processed' => 0,
                    'percent' => 0,
                ],
            ], now()->addDay());

            $this->jobCache->upsertJobsIndex([
                'job_id' => $jobId,
                'status' => 'failed',
                'user_id' => $userId,
                'filename' => $uploadedFile->getClientOriginalName(),
                'mode' => $mode,
                'created_at' => now()->toDateTimeString(),
                'updated_at' => now()->toDateTimeString(),
                'finished_at' => now()->toDateTimeString(),
            ]);

            $response = config('response.common.fail.database');
            $response['msg'] = 'failed to enqueue import job';
            $response['data'] = [
                'job_id' => $jobId,
                'error' => $e->getMessage(),
            ];

            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        // $response['msg'] = 'import queued';
        $response['data'] = [
            'job_id' => $jobId,
            'status' => 'queued',
            'status_endpoint' => 'api/goods/import/status/' . $jobId,
        ];

        return response()->json($response, 202);
    }

    public function delete(string $jobId)
    {
        $payload = $this->jobCache->getJob($jobId);
        $userId = optional(Auth::user())->id;

        if (!$payload || ($payload['user_id'] ?? null) !== $userId) {
            $response = config('response.common.fail.parameter');
            $response['msg'] = 'job not found';
            $response['data'] = ['job_id' => $jobId];
            return response()->json($response, 404);
        }

        $status = (string) ($payload['status'] ?? '');
        if (in_array($status, ['queued', 'processing'], true)) {
            $response = config('response.common.fail.parameter');
            $response['msg'] = 'cannot delete active job';
            $response['data'] = ['job_id' => $jobId, 'status' => $status];
            return response()->json($response, 409);
        }

        $this->jobCache->safeForget($this->jobCache->cacheKey($jobId));

        $index = $this->jobCache->getJobsIndex();
        if (isset($index[$jobId])) {
            unset($index[$jobId]);
            $this->jobCache->safePut($this->jobCache->jobsIndexKey(), $index, now()->addDay());
        }

        $response = config('response.common.success');
        $response['data'] = ['job_id' => $jobId];

        return response()->json($response, 200);
    }
}