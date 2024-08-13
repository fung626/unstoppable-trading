<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Purchase\Purchase as PurchaseResource;
use App\Http\Resources\Goods\Purchase\Purchases as PurchasesResource;
use App\Models\Goods\Purchase\Item;
use App\Models\Goods\Purchase\Purchase;
use App\Models\Goods\Supplier;
use App\Mylibs\Goods as GoodsLib;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Validator;

class PurchaseController extends Controller
{
    //
    protected $select = [
        'goods_purchases.id',
        'goods_purchases.user_id',
        'goods_purchases.supplier_id',
        'goods_purchases.number',
        'goods_purchases.currency',
        'goods_purchases.from_company',
        'goods_purchases.from_email',
        'goods_purchases.to_company_number',
        'goods_purchases.to_address',
        'goods_purchases.to_company',
        'goods_purchases.to_email',
        'goods_purchases.to_phone',
        'goods_purchases.status',
        'goods_purchases.date',
        'goods_purchases.updated_at',
        'goods_purchases.created_at',
    ];

    protected $withs = [
        'items',
        'items.goods',
        'items.goodsItem',
        'supplier',
        'users',
    ];

    protected $status = [
        'PENDING',
        'PROCCESSING',
        'DELIVERED',
    ];

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'supplier.id' => 'required|string|exists:suppliers,id',
            'date' => 'required|string',
            'to_company' => 'required|string',
            'to_contact' => 'required|string',
            'to_phone_country_code' => 'required|string',
            'to_phone' => 'required|string',
            'currency' => 'required|string',
            'status' => 'required|string',
            'purchase_items' => 'required',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        // $response = config('response.common.fail.parameter');
        // return response()->json($response, 400);
        // dd($request->all());

        try {

            DB::transaction(function () {
                $user = Auth::user();
                // $supplier = request('supplier.id');
                $purchase = Purchase::create([
                    'number' => Purchase::getNumber(request('supplier.id')),
                    'supplier_id' => request('supplier.id'),
                    'user_id' => $user->id,
                    'barcode' => GoodsLib::barcode(),
                    'to_company_number' => request('to_company_number'),
                    'to_company' => request('to_company'),
                    'to_contact' => request('to_contact'),
                    'to_address' => request('to_address'),
                    'to_phone_country_code' => request('to_phone_country_code'),
                    'to_phone' => request('to_phone'),
                    'to_fax_country_code' => request('to_fax_country_code'),
                    'to_fax' => request('to_fax'),
                    'to_email' => request('to_email'),
                    'currency' => request('currency'),
                    'status' => request('status'),
                    'date' => Carbon::parse(request('date'))->format('Y-m-d H:i:s'),
                ]);

                $items = request('purchase_items');
                // dd($items);
                foreach ($items as $item) {
                    if ($item['unit_price'] > 0) {
                        $sizes = config('constant.goods.sizes');
                        foreach ($sizes as $size) {
                            if (array_key_exists($size, $item) && $item[$size]) {
                                // $item[$size] = null;
                                // dd($items[$index]);;
                                if ($item[$size]['unit'] > 0) {
                                    Item::create([
                                        'goods_purchase_id' => $purchase->id,
                                        'goods_item_id' => $item[$size]['goods_item_id'],
                                        'goods_id' => $item['goods_id'],
                                        'unit' => $item[$size]['unit'],
                                        'unit_price' => $item['unit_price'],
                                        'cost' => $item['unit_price'] * $item[$size]['unit'],
                                    ]);
                                }
                            }
                        }
                    }
                }
            });

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

    public function get(Request $request)
    {

        $query = Purchase::with($this->withs)
            ->when($request->filled(['supplier_id']), function ($query) {
                $supplier_id = trim(request('supplier_id'));
                return $query->whereHas('suppliers', function ($query) use ($supplier_id) {
                    $query->where('id', $supplier_id);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('goods_purchases.id', 'like', '%' . $keyword . '%')
                        ->orWhere('from_company', 'like', '%' . $keyword . '%')
                        ->orWhere('suppliers.id', 'like', '%' . $keyword . '%')
                        ->orWhere('suppliers.number', 'like', '%' . $keyword . '%')
                        ->orWhere('suppliers.name', 'like', '%' . $keyword . '%')
                        ->orWhere('users.name', 'like', '%' . $keyword . '%')
                        ->orWhere('users.email', 'like', '%' . $keyword . '%');
                });
            })
            ->select($this->select)
            ->join('suppliers', 'suppliers.id', '=', 'goods_purchases.supplier_id')
            ->join('users', 'users.id', '=', 'goods_purchases.user_id');

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
            $resource = new PurchasesResource($result);
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

    public function items(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $items = GoodsLib::formatPurchaseItems(request('id'));
        // dd($items);

        $response = config('response.common.success');
        // dd($results);
        $response['data'] = $items;
        return response()->json($response, 200);
    }

    public function postDefaultValues(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }
        $supplier = Supplier::select()->where(['id' => request('id')])->first();
        $items = GoodsLib::formatPurchaseItems(request('id'));

        $data['supplier'] = $supplier;
        $data['goods_items'] = $items;
        $response = config('response.common.success');
        $response['data'] = $data;
        return response()->json($response, 200);
    }

    public function details(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'string',
            'barcode' => 'string',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $result = Purchase::with($this->withs)
            ->when($request->filled(['id']), function ($query) {
                return $query->where(['id' => request('id')]);
            })
            ->when($request->filled(['barcode']), function ($query) {
                return $query->where(['barcode' => request('barcode')]);
            })
            ->first();
        $response = config('response.common.success');
        // dd($results);
        if ($result) {
            $resource = new PurchaseResource($result);
            $response['data'] = $resource->resolve();
        }
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:goods_purchase,id',
            'status' => 'required|in:' . implode(',', config('purchase.status')),
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            Purchase::where('id', request('id'))
                ->update(['status' => request('status')]);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $result = Purchase::where('id', request('id'))->first();
        $resource = new PurchaseResource($result);

        $response = config('response.common.success');
        $response['data'] = $resource->resolve();
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        $query = Purchase::with($this->withs)
            ->when($request->filled(['supplier_id']), function ($query) {
                $supplier_id = trim(request('supplier_id'));
                return $query->whereHas('suppliers', function ($query) use ($supplier_id) {
                    $query->where('id', $supplier_id);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('goods_purchases.id', 'like', '%' . $keyword . '%')
                        ->orWhere('from_company', 'like', '%' . $keyword . '%')
                        ->orWhere('supplier.id', 'like', '%' . $keyword . '%')
                        ->orWhere('supplier.number', 'like', '%' . $keyword . '%')
                        ->orWhere('supplier.name', 'like', '%' . $keyword . '%')
                        ->orWhere('users.name', 'like', '%' . $keyword . '%')
                        ->orWhere('users.email', 'like', '%' . $keyword . '%');
                });
            })
            ->select($this->select)
            ->join('supplier', 'supplier.id', '=', 'goods_purchases.supplier_id')
            ->join('users', 'users.id', '=', 'goods_purchases.user_id');

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
            __('Supplier'),
            __('Creator'),
            __('Subtotal'),
            __('Status'),
            __('Date'),
            __('Updated at'),
        ];
        $rows = [];
        $resource = new PurchasesResource($result);
        $resource = $resource->resolve();
        foreach ($resource as $item) {
            $row = [
                $item['generated_id'],
                $item['supplier']['name'],
                $item['users']['name'],
                $item['subtotal'],
                __($item['status']),
                $item['date'],
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Purchase'), $rows, $headers, 'pdf');

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}
