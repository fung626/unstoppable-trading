<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\User\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    //
    /// event status
    /// 0 = pending
    /// 1 = approved
    /// 2 = rejected

    public function get(Request $request)
    {
        $query = Event::when($request->filled(['user_id']), function ($query) {
            $userId = trim(request('user_id'));
            return $query->where(function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
        })->when($request->filled(['type']), function ($query) {
            $type = trim(request('type'));
            return $query->where(function ($query) use ($type) {
                $query->where('type', $type);
            });
        })->when($request->filled(['status']), function ($query) {
            $status = trim(request('status'));
            return $query->where(function ($query) use ($status) {
                $query->where('status', $status);
            });
        });
        $response = config('response.common.success');
        $result = $query->get();
        $response['data'] = $result;
        return response()->json($response, 200);
    }

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string|exists:users,id',
            'date' => 'required|string|exists:users,id',
            'type' => 'required|in:' . implode(',', config('constant.currencies')),
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $result = null;

        try {
            $result = Event::create([
                'user_id' => request('user_id'),
                'date' => request('date'),
                'type' => request('type'),
                'status' => 0,
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        $response['data'] = $result;
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:user_events,id',
            'status' => 'required|in:0,1,2',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            Event::update([
                'status' => request('status'),
            ])->where([
                'id' => request('id'),
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        $response['data'] = Event::where(['id' => request('id')])->first();
        return response()->json($response, 200);
    }
}
