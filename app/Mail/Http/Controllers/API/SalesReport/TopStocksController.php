<?php

namespace App\Http\Controllers\API\SalesReport;

use App\Http\Controllers\Controller;
use App\Models\Goods\Stock\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TopStocksController extends Controller
{
    //
    public function get(Request $request)
    {
        // ALTER TABLE dev_unstoppabletrading.goods CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
        $result = Stock::with(['goods', 'goodsItem'])
            ->select([
                'goods_items.id as id',
                'goods.name',
                'goods.type',
                'goods_items.cup',
                'goods_items.size',
                'goods_items.color',
                'goods_items.barcode',
                DB::raw('abs(goods_stocks.unit) as unit'),
            ])
            ->leftJoin('goods', 'goods.id', '=', 'goods_stocks.goods_id')
            ->leftJoin('goods_items', 'goods_items.id', '=', 'goods_stocks.goods_item_id')
            ->where('goods_stocks.type', 'PURCHASE')
            ->orderBy('unit', 'DESC')
            ->groupBy('goods_items.id')
            ->get();
        $response = config('response.common.success');
        $response['data'] = $result;
        return response()->json($response, 200);
    }
}
