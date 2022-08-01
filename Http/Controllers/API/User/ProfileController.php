<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\User\Users;
use App\Mylibs\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Validator;

class ProfileController extends Controller
{
    //

    public function get(Request $request)
    {
        $user = Auth::user();
        $response = config('response.common.success');
        $response['data'] = $user;
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $user = Auth::user();

        try {
            Users::where([
                'id' => $user->id,
            ])->update([
                'name' => request('name'),
                'phone' => request('phone'),
                'email' => request('email'),
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