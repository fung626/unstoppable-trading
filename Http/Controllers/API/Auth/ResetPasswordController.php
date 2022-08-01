<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\Auth\PasswordReset;
use App\Models\User\Users;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Validator;

class ResetPasswordController extends Controller
{
    //

    public function index(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'token' => 'required|string',
        ]);

        if ($validator->fails()) {
            return abort(404);
        }

        $user = Users::where('email', request('email'))->first();
        $passwordReset = PasswordReset::where('email', request('email'))->first();
        // dd($passwordReset);

        if (!$passwordReset || !$user) {
            return abort(404);
        }

        if (!Hash::check(request('token'), $passwordReset->token)) {
            return abort(404);
        }

        return view('auth.password.reset', [
            'email' => request('email'),
            'token' => request('token'),
            'errors' => $validator->errors(),
        ]);

        return response()->json($user);
    }

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|confirmed',
            'token' => 'required|string',
        ]);
        // dd(request('password'), bcrypt(request('password')));
        if ($validator->fails()) {
            return view('auth.password.result', [
                'alert' => 'danger',
                'title' => Lang::get('Fail'),
                'msg' => 'invalid email/password',
            ]);
        }

        $user = Users::where('email', request('email'))->first();
        $passwordReset = PasswordReset::where('email', request('email'))->first();
        // dd($passwordReset);

        if (!$passwordReset || !$user) {
            return view('auth.password.result', [
                'alert' => 'danger',
                'title' => Lang::get('Fail'),
                'msg' => 'No reset password data found',
            ]);
        }

        if (!Hash::check(request('token'), $passwordReset->token)) {
            return view('auth.password.result', [
                'alert' => 'danger',
                'title' => Lang::get('Fail'),
                'msg' => 'No reset password data found',
            ]);
        }

        try {
            DB::transaction(function () {
                Users::where('email', request('email'))
                    ->update(['password' => bcrypt(request('password'))]);
                PasswordReset::where('email', request('email'))->delete();
            });
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return view('auth.password.result', [
                'alert' => 'danger',
                'title' => Lang::get('Fail'),
                'msg' => 'Unknow error',
            ]);
        }

        return view('auth.password.result', [
            'alert' => 'success',
            'title' => Lang::get('Success'),
            'msg' => Lang::get('Your password has updated'),
        ]);
    }

    public function find($token)
    {
        $passwordReset = PasswordReset::where('token', $token)->first();
        if (!$passwordReset) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        if (Carbon::parse($passwordReset->created_at)->addMinutes(60)->isPast()) {
            $passwordReset->delete();
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        return response()->json($passwordReset);
    }
}