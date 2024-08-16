<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Suppliers as SuppliersResource;
use App\Models\Goods\Goods;
use App\Models\Goods\Supplier;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Validator;

class SupplierController extends Controller
{
    //
    protected $withs = [
        'goods',
    ];

    public function post(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'number' => 'required|string',
            'name' => 'required|string',
            'contact' => 'required|string',
            'phone_country_code' => 'required|string',
            'phone' => 'required|string',
            'email' => 'nullable|string|email',
            'address' => 'nullable|string',
            'cost_price_currency' => 'required|in:' . implode(',', config('constant.currencies')),
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {

            Supplier::create([
                'number' => request('number'),
                'name' => request('name'),
                'contact' => request('contact'),
                'phone_country_code' => request('phone_country_code'),
                'phone' => request('phone'),
                'fax_country_code' => request('fax_country_code'),
                'fax' => request('fax'),
                'email' => request('email'),
                'address' => request('address'),
                'cost_price_currency' => request('cost_price_currency'),
            ]);

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

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:suppliers,id',
            'number' => 'required|string',
            'name' => 'required|string',
            'contact' => 'required|string',
            'phone_country_code' => 'required|string',
            'phone' => 'required|string',
            'email' => 'nullable|string|email',
            'address' => 'nullable|string',
            'cost_price_currency' => 'required|in:' . implode(',', config('constant.currencies')),
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            Supplier::where(['id' => request('id')])
                ->update([
                    'number' => request('number'),
                    'name' => request('name'),
                    'contact' => request('contact'),
                    'phone_country_code' => request('phone_country_code'),
                    'phone' => request('phone'),
                    'fax_country_code' => request('fax_country_code'),
                    'fax' => request('fax'),
                    'email' => request('email'),
                    'address' => request('address'),
                    'cost_price_currency' => request('cost_price_currency'),
                ]);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        $response['data'] = Supplier::where(['id' => request('id')])->first();
        return response()->json($response, 200);
    }

    public function get(Request $request)
    {

        $query = Supplier::with($this->withs)
            ->select()
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('number', 'like', '%' . $keyword . '%')
                        ->orWhere('name', 'like', '%' . $keyword . '%')
                        ->orWhere('contact', 'like', '%' . $keyword . '%')
                        ->orWhere('phone_country_code', 'like', '%' . $keyword . '%')
                        ->orWhere('phone', 'like', '%' . $keyword . '%')
                        ->orWhere('fax_country_code', 'like', '%' . $keyword . '%')
                        ->orWhere('fax', 'like', '%' . $keyword . '%')
                        ->orWhere('email', 'like', '%' . $keyword . '%')
                        ->orWhere('address', 'like', '%' . $keyword . '%')
                        ->orWhere('cost_price_currency', 'like', '%' . $keyword . '%');
                });
            });

        if ($request->filled(['sort_by'])) {
            $sortBys = request('sort_by');
            foreach ($sortBys as $sortBy) {
                if ($sortBy["key"] && $sortBy["order"]) {
                    $query->orderBy($sortBy["key"], $sortBy["order"]);
                }
            }
        }

        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $resource = new SuppliersResource($result);
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

        $supplier = Supplier::select()->where(['id' => request('id')])->first();
        $response = config('response.common.success');
        $response['data'] = $supplier;
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

        $count = Goods::where(['supplier_id' => request('id')])->count();
        if ($count > 0) {
            $response = config('response.goods.fail.supplier.delete');
            return response()->json($response, 400);
        }

        try {

            DB::transaction(function () {
                Supplier::where(['id' => request('id')])->delete();
            });

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
        $query = Supplier::select()
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('number', 'like', '%' . $keyword . '%')
                        ->orWhere('name', 'like', '%' . $keyword . '%')
                        ->orWhere('contact', 'like', '%' . $keyword . '%')
                        ->orWhere('phone_country_code', 'like', '%' . $keyword . '%')
                        ->orWhere('phone', 'like', '%' . $keyword . '%')
                        ->orWhere('fax_country_code', 'like', '%' . $keyword . '%')
                        ->orWhere('fax', 'like', '%' . $keyword . '%')
                        ->orWhere('email', 'like', '%' . $keyword . '%')
                        ->orWhere('address', 'like', '%' . $keyword . '%')
                        ->orWhere('cost_price_currency', 'like', '%' . $keyword . '%');
                });
            });

        if ($request->filled(['sort_by'])) {
            $sortBys = request('sort_by');
            foreach ($sortBys as $sortBy) {
                if ($sortBy["key"] && $sortBy["order"]) {
                    $query->orderBy($sortBy["key"], $sortBy["order"]);
                }
            }
        }

        $result = $query->get();
        $headers = [
            __('Number'),
            __('Name'),
            __('Contact'),
            __('Phone'),
            __('Fax'),
            __('Address'),
            __('Updated at'),
        ];
        $rows = [];
        foreach ($result->toArray() as $item) {
            $row = [
                $item['number'],
                $item['name'],
                $item['contact'],
                $item['phone'],
                $item['fax'],
                $item['address'],
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Supplier'), $rows, $headers, request('extension'));

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}
