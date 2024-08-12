<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\User\Employee;
use App\Models\User\Users;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Validator;

class EmployeeController extends Controller
{
    //
    public function get(Request $request)
    {
        $result = Employee::where(['user_id' => request('id')])->first();
        if (!$result) {
            $user = Users::where(['user_id' => request('id')]);
            if ($user->role === 'EMPLOYEE') {
                $result = Employee::create([
                    'user_id' => request('id'),
                    'employee_contribution' => $user->role === 'EMPLOYEE' ? 5 : null,
                    'employer_contribution' => $user->role === 'EMPLOYEE' ? 5 : null,
                    'joined_at' => Carbon::today(),
                ]);
            }
        }
        $response = config('response.common.success');
        $response['data'] = $result;
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:users,id',
            'joined_at' => 'required|date_format:Y-m-d',
            'left_at' => 'nullable|date_format:Y-m-d',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }
        // $user = Auth::user();

        try {
            Employee::where([
                'user_id' => request('id'),
            ])->update([
                'salary' => request('salary'),
                'employee_contribution' => request('employee_contribution'),
                'employer_contribution' => request('employer_contribution'),
                'type' => request('type'),
                'joined_at' => request('joined_at'),
                'left_at' => request('left_at'),
                'annual_leave_days' => request('annual_leave_days'),
                'duty_default_color' => request('duty_default_color'),
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 400);
        }
        // dd($user);
        $response = config('response.common.success');
        $response['data'] = Employee::where([
            'user_id' => request('id'),
        ])->first();
        return response()->json($response, 200);
    }

}
