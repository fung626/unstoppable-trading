<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\Config\UserRole;
use App\Models\User\Permission;
use App\Mylibs\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    //
    public function index(Request $request)
    {
        // dd(bcrypt('demo'));
        if (!$request->has(['email', 'password'])) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            switch ($user->role) {
                case 'ADMIN':
                    $token = $user->createToken('FRONT-END', ['*'])->accessToken;
                    break;
                case 'EMPLOYEE':
                    $scopes = [];
                    $permission = Permission::where(['user_id' => $user->id])->first();
                    if (!$permission) {
                        $role = UserRole::where(['name' => $user->role])->first();
                        Permission::create([
                            'user_id' => $user->id,
                        ]);
                        $permission = Permission::where([
                            'user_id' => $user->id,
                        ])->update(['items' => $role->functions]);
                    }

                    foreach ($permission->items as $key => $value) {
                        if ($value === true) {
                            $scopes[] = $key;
                            // Log::debug($key);
                        }
                    }
                    // Log::debug($scopes);
                    $token = $user->createToken('FRONT-END', $scopes)->accessToken;
                    break;
                default:
                    $token = $user->createToken('FRONT-END', [])->accessToken;
                    break;
            }

            $response = config('response.auth.success.login');
            // $response = config('response.common.success');
            $data = $user->toArray();
            $data['token'] = $token;
            $data['permission'] = Permission::where(['user_id' => $user->id])->first();
            $data['config'] = [
                'cups' => Common::formatConfig(config('constant.goods.cups')),
                'colors' => Common::formatConfig(config('constant.goods.colors')),
                'sizes' => Common::formatConfig(config('constant.goods.sizes')),
            ];
            $response['data'] = $data;
            return response()->json($response, 200);
        }

        $response = config('response.auth.fail.login');
        return response()->json($response, 400);
    }
}