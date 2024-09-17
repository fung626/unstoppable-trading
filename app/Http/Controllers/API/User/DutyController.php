<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\DutyCollection;
use App\Models\User\Duty;
use App\Mylibs\Common;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
                        ->orWhere('user.name', 'like', '%' . $keyword . '%')
                        ->orWhere('user.email', 'like', '%' . $keyword . '%')
                        ->orWhere('user.phone', 'like', '%' . $keyword . '%');
                });
            })
            ->select(['user_duties.*'])
            ->join('users as user', 'user.id', '=', 'user_duties.user_id');

        if ($request->filled(['sort_by'])) {
            $sortBys = request('sort_by');
            foreach ($sortBys as $sortBy) {
                if ($sortBy["key"] && $sortBy["order"]) {
                    $query->orderBy($sortBy["key"], $sortBy["order"]);
                }
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
            'dates.*' => 'required|date_format:Y-m-d|after_or_equal:today',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            DB::transaction(function () {
                if (count(request('dates')) === 1) {
                    $item = request('dates')[0];
                    Duty::updateOrCreate([
                        'user_id' => request('user')['id'],
                        'date' => $item,
                        'editable' => true,
                    ], [
                        'start' => $item . ' ' . request('start'),
                        'end' => $item . ' ' . request('end'),
                        'color' => request('color'),
                    ]);
                } else if (count(request('dates')) > 1) {
                    $startDate = request('dates')[0];
                    $endDate = request('dates')[1];
                    if ($startDate === $endDate) {
                        $item = $startDate;
                        Duty::updateOrCreate([
                            'user_id' => request('user')['id'],
                            'date' => $item,
                            'editable' => true,
                        ], [
                            'start' => $item . ' ' . request('start'),
                            'end' => $item . ' ' . request('end'),
                            'color' => request('color'),
                        ]);
                    } else {
                        $range = Common::getDatesFromRange($startDate, $endDate);
                        foreach ($range as $item) {
                            Duty::updateOrCreate([
                                'user_id' => request('user')['id'],
                                'date' => $item,
                                'editable' => true,
                            ], [
                                'start' => $item . ' ' . request('start'),
                                'end' => $item . ' ' . request('end'),
                                'color' => request('color'),
                            ]);
                        }
                    }
                }
            });
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 400);
        }

        $response = config('response.common.success');
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
            'color' => request('color'),
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

        $duty = Duty::where(['id' => request('id')])->first();

        if ($duty->editable) {
            try {
                Duty::where(['id' => request('id')])->delete();
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error($e->getMessage());
                // $errorInfo = $e->errorInfo;
                $response = config('response.common.fail.database');
                $response['msg'] = $e->getMessage();
                return response()->json($response, 500);
            }
        } else {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
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

        if ($request->filled(['sort_by'])) {
            $sortBys = request('sort_by');
            foreach ($sortBys as $sortBy) {
                if ($sortBy["key"] && $sortBy["order"]) {
                    $query->orderBy($sortBy["key"], $sortBy["order"]);
                }
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

        $path = MyPhpOffice::exportTableWithPath('duty', $rows, $headers, request('extension'));

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }
}
