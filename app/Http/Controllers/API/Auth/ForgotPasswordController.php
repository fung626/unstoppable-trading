<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
// use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use App\Models\Auth\PasswordReset as PasswordResetModel;
use App\Models\User\Users;
// use Illuminate\Auth\Notifications\ResetPassword;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Validator;

class ForgotPasswordController extends Controller
{

    // use SendsPasswordResetEmails;
    //

    // public function get(Request $request)
    // {
    //     return view('auth.password.forgot');
    // }

    public function forgot(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $user = Users::where('email', request('email'))->first();
        // dd($request->only('email'));
        if ($user) {
            // Illuminate\Auth\Notifications\ResetPassword::toMail();
            $response = Password::sendResetLink(['email' => request('email')]);

            switch ($response) {
                case Password::RESET_LINK_SENT:
                    // $request->session()->flash('alert', 'success');
                    // $request->session()->flash('msg', Lang::get('auth.password.forgot.alert.linksent'));
                    // return redirect()
                    //     ->back();
                    $response = config('response.common.success');
                    return response()->json($response, 200);
                case Password::RESET_THROTTLED:
                    // $request->session()->flash('alert', 'danger');
                    // $request->session()->flash('msg', Lang::get('Invalid email'));
                    // return redirect()
                    //     ->back();
                    $response = config('response.common.success');
                    return response()->json($response, 200);
                case Password::INVALID_USER:
                    // $request->session()->flash('alert', 'danger');
                    // $request->session()->flash('msg', Lang::get('Invalid email'));
                    // return redirect()
                    //     ->back();
                    $response = config('response.common.fail.parameter');
                    return response()->json($response, 400);
            }
        } else {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }
    }

    public function reset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:users,id',
            'token' => 'required|string',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $user = Users::where('id', request('id'))->first();
        $passwordReset = PasswordResetModel::where(['email' => $user->email])->first();

        if (!$passwordReset) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        if (!Hash::check(request('token'), $passwordReset->token)) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        if (Carbon::parse($passwordReset->created_at)->addMinutes(60)->isPast()) {
            PasswordResetModel::where(['email' => $user->email])->delete();
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        try {
            DB::transaction(function () use ($user) {
                Users::where([
                    'id' => $user->id,
                ])->update([
                    'password' => bcrypt(request('confirm_password')),
                ]);
                PasswordResetModel::where(['email' => $user->email])->delete();
            });
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            return response()->json($response, 400);
        }

        $response = config('response.common.success');
        return response()->json($response, 200);

    }

    public function find(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:users,id',
            'token' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $user = Users::where('id', request('id'))->first();
        $passwordReset = PasswordResetModel::where(['email' => $user->email])->first();

        if (!$passwordReset) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        if (!Hash::check(request('token'), $passwordReset->token)) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        if (Carbon::parse($passwordReset->created_at)->addMinutes(60)->isPast()) {
            PasswordResetModel::where(['email' => $user->email])->delete();
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $response = config('response.common.success');
        return response()->json($response, 200);
    }

}
