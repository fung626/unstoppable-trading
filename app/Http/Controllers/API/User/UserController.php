<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Models\User\Employee;
use App\Models\User\Users;
use App\Mylibs\MyPhpOffice;
use App\Mylibs\Role;
use App\Mylibs\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Validator;

class UserController extends Controller
{
    //
    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|in:' . implode(',', Role::getRoles()),
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $user_id = User::getId();
        $password = Str::random(8);

        try {
            Users::create([
                'id' => $user_id,
                'role' => request('role'),
                'name' => request('name'),
                'phone' => request('phone'),
                'email' => request('email'),
                'password' => bcrypt($password),
            ]);
            Employee::create([
                'user_id' => $user_id,
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            return response()->json($response, 400);
        }

        // dd($user);
        $user = Users::where(['id' => $user_id])->first();
        $expiresAt = now()->addDay();
        $user->sendWelcomeNotification($expiresAt, $password);

        $response = config('response.common.success');
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:users,id',
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
                'id' => request('id'),
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
            'id' => request('id'),
        ])->first();
        return response()->json($response, 200);
    }

    public function get(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'role' => 'nullable|in:' . implode(',', Role::getRoles()),
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $query = Users::when($request->filled(['role']), function ($query) {
            $role = trim(request('role'));
            return $query->where(function ($query) use ($role) {
                $query->where('role', $role);
            });
        })->when($request->filled(['search']), function ($query) {
            $keyword = trim(request('search'));
            return $query->where(function ($query) use ($keyword) {
                $query->where('id', 'like', '%' . $keyword . '%')
                    ->orWhere('name', 'like', '%' . $keyword . '%')
                    ->orWhere('email', 'like', '%' . $keyword . '%')
                    ->orWhere('phone', 'like', '%' . $keyword . '%');
            });
        });

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                if ($sortBy === "name") {
                    $query->orderBy('name_tc', $sortDesc ? 'DESC' : 'ASC');
                    $query->orderBy('name_en', $sortDesc ? 'DESC' : 'ASC');
                } else {
                    if ($sortBy !== "action") {
                        $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                    }
                }
                $index++;
            }
        }

        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $resource = new UserCollection($result);
            $response['data'] = [
                'data' => $resource,
                'total' => $result->total(),
                'last_page' => $result->lastPage(),
                'current_page' => $result->currentPage(),
                'has_more_pages' => $result->hasMorePages(),
            ];
        } else {
            $result = $query->get();
            $response['data'] = $result;
        }

        return response()->json($response, 200);
    }

    public function details(Request $request)
    {
        $query = Users::with(['employee'])
            ->where(['id' => request('id')]);
        $response = config('response.common.success');
        $result = $query->first();
        $response['data'] = $result;
        return response()->json($response, 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            Users::where(['id' => request('id')])->delete();
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        return response()->json($response, 200);

    }

    public function export(Request $request)
    {
        $query = Users::when($request->filled(['search']), function ($query) {
            $keyword = trim(request('search'));
            return $query->where(function ($query) use ($keyword) {
                $query->where('id', 'like', '%' . $keyword . '%')
                    ->orWhere('name', 'like', '%' . $keyword . '%')
                    ->orWhere('email', 'like', '%' . $keyword . '%')
                    ->orWhere('phone', 'like', '%' . $keyword . '%');
            });
        });

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                if ($sortBy === "name") {
                    $query->orderBy('name_tc', $sortDesc ? 'DESC' : 'ASC');
                    $query->orderBy('name_en', $sortDesc ? 'DESC' : 'ASC');
                } else {
                    if ($sortBy !== "action") {
                        $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                    }
                }
                $index++;
            }
        }

        $result = $query->get();
        $headers = [
            __('Number'),
            __('Email'),
            __('Phone'),
            __('Role'),
            __('Created at'),
            __('Updated at'),
        ];
        $rows = [];
        foreach ($result->toArray() as $item) {
            $row = [
                $item['id'],
                $item['email'],
                $item['phone'],
                $item['role'],
                Carbon::parse($item['created_at'])->format('Y-m-d H:i:s'),
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('User'), $rows, $headers, request('extension'));

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}
