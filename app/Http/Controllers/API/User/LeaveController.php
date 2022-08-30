<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\LeaveCollection;
use App\Models\User\Leave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Validator;

class LeaveController extends Controller
{
    //
    public function get(Request $request)
    {
        $result = Leave::with(['user', 'approvedBy'])
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('approved_by', 'like', '%' . $keyword . '%')
                        ->orWhere('user_id', 'like', '%' . $keyword . '%')
                        ->orWhere('users.name', 'like', '%' . $keyword . '%')
                        ->orWhere('users.email', 'like', '%' . $keyword . '%')
                        ->orWhere('users.phone', 'like', '%' . $keyword . '%');
                });
            })
            ->select(['user_leaves.*'])
            ->join('users', 'users.id', '=', 'user_leaves.user_id');

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                if ($sortBy !== "actions") {
                    $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                }
                $index++;
            }
        }

        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $resource = new LeaveCollection($result);
            $response['data'] = [
                'data' => $resource,
                'total' => $result->total(),
                'last_page' => $result->lastPage(),
                'current_page' => $result->currentPage(),
                'has_more_pages' => $result->hasMorePages(),
            ];
        } else {
            $result = $query->get();
            $response['data'] = $result;
        }

        return response()->json($response, 200);
    }

    public function details(Request $request)
    {
        $query = Leave::with(['user', 'approvedBy'])
            ->where(['id' => request('id')]);
        $response = config('response.common.success');
        $result = $query->first();
        $response['data'] = $result;
        return response()->json($response, 200);
    }

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        Leave::create([
            'user_id' => request('user_id'),
            'start' => request('start'),
            'end' => request('end'),
            'remark' => request('remark'),
        ]);

        $response = config('response.common.success');
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:user_leaves,id',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        Leave::where([
            'id' => request('id'),
        ])->update([
            'start' => request('start'),
            'end' => request('end'),
            'remark' => request('remark'),
        ]);

        $response = config('response.common.success');
        $response['data'] = Leave::where(['id' => request('id')])->first();
        return response()->json($response, 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:user_leaves,id',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            Leave::where(['id' => request('id')])->delete();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            return response()->json($response, 400);
        }

        $response = config('response.common.success');
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {

    }
}