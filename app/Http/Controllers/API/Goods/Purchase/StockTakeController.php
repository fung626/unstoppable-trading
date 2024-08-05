<?php

namespace App\Http\Controllers\API\Goods\Purchase;

use App\Http\Controllers\Controller;
use App\Models\Goods\Purchase\Purchase;
use App\Models\Goods\Stock\Stock as GoodsStock;
use App\Models\Goods\Stock\StockTake;
use App\Mylibs\Goods as GoodsLib;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Validator;

class StocktakeController extends Controller
{
    //
    protected $withs = [
        'items',
        'items.goods',
        'items.goodsItem',
        'supplier',
        'users',
    ];

    public function post(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'goods_purchase_id' => 'required',
            'items' => 'required',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            DB::transaction(function () {
                $items = request('items');
                foreach ($items as $item) {
                    $sizes = config('constant.goods.sizes');
                    foreach ($sizes as $size) {
                        if (array_key_exists($size, $item) && $item[$size]) {
                            if ($item[$size]['unit'] <= 0) {
                                continue;
                            }
                            $stock = GoodsStock::create([
                                'goods_id' => $item['goods_id'],
                                'goods_item_id' => $item[$size]['goods_item_id'],
                                'unit' => $item[$size]['unit'],
                                'unit_price' => $item['unit_price'],
                                'type' => 'PURCHASE',
                            ]);
                            StockTake::create([
                                'goods_stock_id' => $stock->id,
                                'warehouse_id' => request('warehouse_id'),
                                'goods_purchase_id' => request('goods_purchase_id'),
                                'goods_purchase_item_id' => $item[$size]['goods_purchase_item_id'],
                            ]);
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

    public function details(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $purchase = Purchase::with($this->withs)
            ->where(['id' => request('id')])
            ->first();
        $purchaseItems = GoodsLib::formatPurchaseInvoiceItems(request('id'));
        $purchase->purchase_items = $purchaseItems;

        $response = config('response.common.success');
        // dd($result->toArray(), $purchaseItems[0]);
        $response['data'] = $purchase;
        return response()->json($response, 200);
    }

}
