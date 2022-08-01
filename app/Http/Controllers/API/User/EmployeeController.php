<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\User\Employees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Validator;

class EmployeeController extends Controller
{
    //
    public function get(Request $request)
    {
        $query = Employees::where(['user_id' => request('id')]);
        $result = $query->first();
        if (!$result) {
            $result = Employees::create([
                'user_id' => request('id'),
            ]);
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
            'left_at' => 'required|date_format:Y-m-d',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }
        // $user = Auth::user();

        try {
            Employees::where([
                'user_id' => request('id'),
            ])->update([
                'salary' => request('salary'),
                'employee_contribution' => request('employee_contribution'),
                'employer_contribution' => request('employer_contribution'),
                'joined_at' => request('joined_at'),
                'left_at' => request('left_at'),
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            return response()->json($response, 400);
        }
        // dd($user);
        $response = config('response.common.success');
        $response['data'] = Employees::where([
            'user_id' => request('id'),
        ])->first();
        return response()->json($response, 200);
    }

}
