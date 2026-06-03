<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\User\Duty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DutyCalendarController extends Controller
{
    //
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'from' => 'date_format:Y-m-d',
            'to' => 'date_format:Y-m-d',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $user = Auth::user();
        if (!$user->is_admin && !$request->filled(['user_id'])) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $result = Duty::with(['user'])
            ->when($request->filled(['user_id']) && $user->is_admin, function ($query) {
                $user_id = trim(request('user_id'));
                return $query->where(function ($query) use ($user_id) {
                    $query->where('user_id', $user_id);
                });
            })
            ->when($request->filled(['user_id']) && request('user_id') === $user->id, function ($query) {
                $user_id = trim(request('user_id'));
                return $query->where(function ($query) use ($user_id) {
                    $query->where('user_id', $user_id);
                });
            })
            ->when($request->filled(['from', 'to']), function ($query) {
                $from = date(request('from'));
                $to = date(request('to'));
                return $query->where(function ($query) use ($from, $to) {
                    $query->whereBetween('start', [$from . " 00:00:00", $to . " 23:59:59"]);
                });
            })
            ->get();

        $response = config('response.common.success');
        $response['data'] = $result;
        return response()->json($response, 200);
    }

}
