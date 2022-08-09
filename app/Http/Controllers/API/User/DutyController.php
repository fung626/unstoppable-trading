<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\DutyCollection;
use App\Models\User\Duty;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;

class DutyController extends Controller
{
    //
    public function get(Request $request)
    {
        $query = Duty::with(['user'])
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('user_id', 'like', '%' . $keyword . '%')
                        ->orWhere('users.name', 'like', '%' . $keyword . '%')
                        ->orWhere('users.email', 'like', '%' . $keyword . '%')
                        ->orWhere('users.phone', 'like', '%' . $keyword . '%');
                });
            })
            ->select(['user_duties.*'])
            ->join('users', 'users.id', '=', 'user_duties.user_id');

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
            $resource = new DutyCollection($result);
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
        $query = Duty::with(['user'])
            ->where(['id' => request('id')]);
        $response = config('response.common.success');
        $result = $query->first();
        $response['data'] = $result;
        return response()->json($response, 200);
    }

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user.id' => 'required|exists:users,id',
            'date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $result = Duty::create([
            'user_id' => request('user')['id'],
            'date' => request('date'),
            'start' => request('date') . ' ' . request('start'),
            'end' => request('date') . ' ' . request('end'),
        ]);

        $response = config('response.common.success');
        $response['data'] = $result;
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:user_duties,id',
            'date' => 'required|date_format:Y-m-d',
            'formatted_start' => 'required|date_format:H:i',
            'formatted_end' => 'required|date_format:H:i|after:formatted_start',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        Duty::where([
            'id' => request('id'),
        ])->update([
            'date' => request('date'),
            'start' => request('date') . ' ' . request('formatted_start'),
            'end' => request('date') . ' ' . request('formatted_end'),
        ]);

        $response = config('response.common.success');
        $response['data'] = Duty::with(['user'])->where(['id' => request('id')])->first();
        return response()->json($response, 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        try {
            Duty::where(['id' => request('id')])->delete();
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        return response()->json($response, 200);

    }

    public function export(Request $request)
    {
        $query = Duty::with(['user'])
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('user_id', 'like', '%' . $keyword . '%')
                        ->orWhere('users.name', 'like', '%' . $keyword . '%')
                        ->orWhere('users.email', 'like', '%' . $keyword . '%')
                        ->orWhere('users.phone', 'like', '%' . $keyword . '%');
                });
            })
            ->select(['user_duties.*'])
            ->join('users', 'users.id', '=', 'user_duties.user_id');

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

        $result = $query->get();
        $headers = [
            __('Name'),
            __('Start'),
            __('End'),
            __('Created at'),
            __('Updated at'),
        ];

        $rows = [];
        foreach ($result->toArray() as $item) {
            $row = [
                $item['user']['name'],
                $item['start'],
                $item['end'],
                Carbon::parse($item['created_at'])->format('Y-m-d H:i:s'),
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Duty'), $rows, $headers, request('extension'));

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }
}