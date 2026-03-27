<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\Config\UserRole;
use App\Models\User\Permission;
use App\Models\User\Users;
use App\Mylibs\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Passport;

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
            /** @var Users $user */
            $user = Auth::user();
            switch ($user->role) {
                case 'ADMIN':
                    $token = $user->createToken('FRONT-END', ['*'])->accessToken;
                    break;
                case 'EMPLOYEE':
                    $scopes = [];
                    $allowedScopeMap = [];
                    foreach (Passport::scopeIds() as $scopeId) {
                        $normalizedScopeId = strtolower(str_replace([' ', '-', '_'], '', trim($scopeId)));
                        $allowedScopeMap[$normalizedScopeId] = $scopeId;
                    }
                    $permission = Permission::where(['user_id' => $user->id])->first();
                    if (!$permission) {
                        $role = UserRole::where(['name' => $user->role])->first();
                        Permission::create([
                            'user_id' => $user->id,
                        ]);
                        Permission::where([
                            'user_id' => $user->id,
                        ])->update(['items' => $role->functions]);
                        $permission = Permission::where(['user_id' => $user->id])->first();
                    }

                    $permissionItems = is_array($permission->items) ? $permission->items : [];
                    foreach ($permissionItems as $key => $value) {
                        $enabled = false;
                        if (is_array($value)) {
                            array_walk_recursive($value, function ($item) use (&$enabled) {
                                if ($enabled) {
                                    return;
                                }

                                $booleanValue = filter_var($item, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                                if ($booleanValue === true || in_array($item, [1, '1'], true)) {
                                    $enabled = true;
                                }
                            });
                        } else {
                            $enabled = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                            if ($enabled === null) {
                                $enabled = in_array($value, [1, '1'], true);
                            }
                        }

                        $rawKey = trim((string) $key);
                        $normalizedKey = strtolower(str_replace([' ', '-', '_'], '', $rawKey));
                        $normalizedSingularKey = strtolower(str_replace([' ', '-', '_'], '', Str::singular($rawKey)));

                        $candidateScopeKeys = array_values(array_unique([
                            $normalizedKey,
                            $normalizedSingularKey,
                        ]));

                        foreach ($candidateScopeKeys as $candidateScopeKey) {
                            if ($enabled === true && isset($allowedScopeMap[$candidateScopeKey])) {
                                $scopes[] = $allowedScopeMap[$candidateScopeKey];
                                // Log::debug($key);
                                break;
                            }
                        }
                    }
                    $scopes = array_values(array_unique($scopes));
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