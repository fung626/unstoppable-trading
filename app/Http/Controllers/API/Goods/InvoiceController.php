<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Models\Goods\Invoice\Invoice;
use App\Models\Goods\Invoice\Item as InvoiceItem;
use App\Models\Goods\Warehouse\Stock as WarehouseStock;
use App\Mylibs\WarehouseStock as WarehouseStocklib;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Validator;

class InvoiceController extends Controller
{
    //

    protected $withs = [
        'items',
        'items.goods',
    ];

    public function __construct()
    {
        DB::enableQueryLog();
    }

    public function post(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'client_id' => 'required|string',
            'address' => 'required|string',
            'status' => 'required|integer',
            'type' => 'required|in:' . implode(',', WarehouseStocklib::$types),
            'date' => 'required|date',
            'items' => 'filled',
            'items.*.goods_id' => 'required|string|exists:goods,id',
            'items.*.warehouse_id' => 'required|string|exists:warehouse_stocks,warehouse_id',
            'items.*.quantity' => 'required|integer',
            'items.*.price' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['msg'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {

            DB::transaction(function () {
                $invoice = Invoice::create([
                    'user_id' => Auth::user()->id,
                    'client_id' => request('client_id'),
                    'status' => request('status'),
                    'address' => request('address'),
                    'date' => request('date'),
                ]);
                $items = request('items');
                foreach ($items as $item) {
                    // dd($item['goods_id']);

                    $available = WarehouseStock::available($item['warehouse_id'], $item['goods_id']);
                    // dd($available, DB::getQueryLog());
                    if ($available < 1 || $available < $item['quantity'] * 1) {
                        throw new \Exception('understock');
                    }
                    $invoiceItem = InvoiceItem::create([
                        'invoice_id' => $invoice->id,
                        'goods_id' => $item['goods_id'],
                        'quantity' => $item['quantity'],
                        'price' => $item['price'],
                    ]);
                    $_item = (object) $item;
                    $_item->type = request('type');
                    $_item->invoice_item_id = $invoiceItem->id;
                    $result = WarehouseStocklib::create((object) $_item);
                    if (!empty($result->response) && !empty($result->code)) {
                        throw new \Exception($result->response);
                    }

                }
            });

        } catch (\Exception $e) {
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

        // $page = $request->filled('page') ? request('page') : 1;
        // $perPage = $request->filled('per_page') ? request('per_page') : 10;

        $query = Invoice::with($this->withs)
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('user_id', 'like', '%' . $keyword . '%')
                        ->orWhere('client_id', 'like', '%' . $keyword . '%');
                });
            });
        if ($request->filled(['page', 'per_page'])) {
            $results = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
        } else {
            $results = $query->get();
        }
        $response = config('response.common.success');
        $response['data'] = $results;
        return response()->json($response, 200);
    }

}
