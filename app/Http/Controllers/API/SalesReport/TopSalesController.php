<?php

namespace App\Http\Controllers\API\SalesReport;

use App\Http\Controllers\Controller;
use App\Models\Goods\Stock\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TopSalesController extends Controller
{
    //
    public function get(Request $request)
    {
        // ALTER TABLE dev_unstoppabletrading.goods CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
        $result = Stock::with(['goods', 'goodsItem'])
            ->select([
                'goods_item.id as id',
                'goods.name',
                'goods.type',
                'goods_item.cup',
                'goods_item.size',
                'goods_item.color',
                'goods_item.barcode',
                DB::raw('abs(goods_stock.unit) as unit'),
            ])
            ->leftJoin('goods', 'goods.id', '=', 'goods_stock.goods_id')
            ->leftJoin('goods_item', 'goods_item.id', '=', 'goods_stock.goods_item_id')
            ->where('goods_stock.type', 'SHIP')
            ->orderBy('unit', 'DESC')
            ->groupBy('goods_item.id')
            ->get();
        $response = config('response.common.success');
        $response['data'] = $result;
        return response()->json($response, 200);
    }
}
