<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Spatie\WelcomeNotification\WelcomeController as BaseWelcomeController;
use Validator;

class MyWelcomeController extends BaseWelcomeController
{
    //
    public function showWelcomeForm(Request $request, User $user)
    {
        // dd($user->id);
        return view('auth.password.initial', [
            'user_id' => $user->id,
            'email' => $user->email,
            'signature' => request('signature'),
        ]);
    }

    public function savePassword(Request $request, User $user)
    {
        // $validated = $request->validate($this->rules());
        $validator = Validator::make($request->all(), $this->rules());

        if ($validator->fails()) {
            // dd($validator->errors());
            return redirect()->back()->withErrors($validator->errors());
        }

        // dd($validator);
        $user->password = bcrypt(request('password'));
        $user->welcome_valid_until = null;
        $user->save();
        //
        return view('auth.password.result')->with([
            'alert' => 'success',
            'title' => Lang::get('Success'),
            'msg' => Lang::get('Your password has updated'),
            'link' => [
                'name' => Lang::get('Redirect to login page'),
                'url' => env("APP_URL"),
            ],
        ]);
    }

    public function rules()
    {
        return [
            'password' => 'required|confirmed|min:8',
        ];
    }

}