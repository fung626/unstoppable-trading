<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\Config\UserRole;
use App\Models\User\Permission;
use App\Models\User\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PermissionController extends Controller
{
    //
    public function get(Request $request)
    {
        $query = Permission::where(['user_id' => request('id')]);
        $result = $query->first();
        if (!$result) {
            $user = Users::where(['id' => request('id')])->first();
            $role = UserRole::where(['name' => $user->role])->first();
            Permission::create([
                'user_id' => request('id'),
            ]);
            Permission::where([
                'user_id' => request('id'),
            ])->update(['items' => $role->functions]);
        }
        $response = config('response.common.success');
        $response['data'] = Permission::with(['user'])->where([
            'user_id' => request('id'),
        ])->first();
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:users,id',
            'items' => 'required',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }
        // $user = Auth::user();
        try {
            Permission::where([
                'user_id' => request('id'),
            ])->update([
                'items' => request('items'),
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            return response()->json($response, 400);
        }
        // dd($user);
        $response = config('response.common.success');
        $response['data'] = Permission::with(['user'])->where([
            'user_id' => request('id'),
        ])->first();
        return response()->json($response, 200);
    }

}