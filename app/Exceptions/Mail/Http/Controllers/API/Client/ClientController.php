<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\Client\Clients as ClientsResource;
use App\Models\Client\Client;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    //

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'number' => 'required|string',
            'name' => 'required|string',
            'contact' => 'required|string',
            'phone_country_code' => 'required|string',
            'phone' => 'required|string',
            'email' => 'nullable|string|email',
            'currency' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            Client::create([
                'number' => request('number'),
                'name' => request('name'),
                'contact' => request('contact'),
                'phone_country_code' => request('phone_country_code'),
                'phone' => request('phone'),
                'email' => request('email'),
                'address' => request('address'),
                'currency' => request('currency'),
                'grade' => request('grade'),
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            return response()->json($response, 400);
        }

        $response = config('response.common.success');
        return response()->json($response, 200);

    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string:client,id',
            'number' => 'required|string',
            'name' => 'required|string',
            'contact' => 'required|string',
            'phone_country_code' => 'required|string',
            'phone' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            Client::where([
                'id' => request('id'),
            ])->update([
                'number' => request('number'),
                'name' => request('name'),
                'contact' => request('contact'),
                'phone_country_code' => request('phone_country_code'),
                'phone' => request('phone'),
                'email' => request('email'),
                'address' => request('address'),
                'currency' => request('currency'),
                'grade' => request('grade'),
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            return response()->json($response, 400);
        }
        // dd($user);
        $response = config('response.common.success');
        $response['data'] = Client::where([
            'id' => request('id'),
        ])->first();
        return response()->json($response, 200);
    }

    public function get(Request $request)
    {
        // $page = $request->filled('page') ? request('page') : 1;
        // $perPage = $request->filled('per_page') ? request('per_page') : 10;
        $query = Client::select()
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('number', 'like', '%' . $keyword . '%')
                        ->orWhere('name', 'like', '%' . $keyword . '%')
                        ->orWhere('contact', 'like', '%' . $keyword . '%')
                        ->orWhere('phone_country_code', 'like', '%' . $keyword . '%')
                        ->orWhere('phone', 'like', '%' . $keyword . '%')
                        ->orWhere('email', 'like', '%' . $keyword . '%')
                        ->orWhere('address', 'like', '%' . $keyword . '%');
                });
            });

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                if ($sortBy !== "actions") {
                    $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                }
                $index++;
            }
        }

        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $resource = new ClientsResource($result);
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
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $client = Client::select()->where(['id' => request('id')])->first();
        $response = config('response.common.success');
        $response['data'] = $client;
        return response()->json($response, 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);
        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }
        try {
            Client::where(['id' => request('id')])->delete();
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }
        $response = config('response.common.success');
        // $response['data'] = Goods::with($this->withs)->get();
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        $query = Client::select()
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('number', 'like', '%' . $keyword . '%')
                        ->orWhere('name', 'like', '%' . $keyword . '%')
                        ->orWhere('contact', 'like', '%' . $keyword . '%')
                        ->orWhere('phone_country_code', 'like', '%' . $keyword . '%')
                        ->orWhere('phone', 'like', '%' . $keyword . '%')
                        ->orWhere('email', 'like', '%' . $keyword . '%')
                        ->orWhere('address', 'like', '%' . $keyword . '%');
                });
            });

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                if ($sortBy !== "actions") {
                    $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                }
                $index++;
            }
        }

        $result = $query->get();
        $headers = [
            __('Number'),
            __('Name'),
            __('Contact'),
            __('Phone'),
            __('Email'),
            __('Updated at'),
        ];
        $rows = [];
        $resource = new ClientsResource($result);

        $resource = $resource->resolve();
        foreach ($resource as $item) {
            $row = [
                $item['number'],
                $item['name'],
                $item['contact'],
                isset($item['formated_phone']) ? $item['formated_phone'] : null,
                $item['email'],
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Client'), $rows, $headers, 'pdf');

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}