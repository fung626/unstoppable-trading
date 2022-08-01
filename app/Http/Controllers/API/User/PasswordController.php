<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\User\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Validator;

class PasswordController extends Controller
{
    //
    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:8',
            'confirm_password' => 'required|same:new_password',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $user = Auth::user();
        if (!Hash::check(request('old_password'), $user->password)) {
            $response = config('response.user.fail.password');
            return response()->json($response, 400);
        }

        try {
            Users::where([
                'id' => $user->id,
            ])->update([
                'password' => bcrypt(request('confirm_password')),
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            return response()->json($response, 400);
        }
        // dd($user);
        $response = config('response.common.success');
        $response['data'] = Users::where([
            'id' => $user->id,
        ])->first();
        return response()->json($response, 200);
    }

}