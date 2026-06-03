<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Goods\Stock\Stock;
use App\Models\Goods\Item;
use App\Mylibs\Common;

class DashboardController extends Controller
{
    //

    public function get(Request $request) {
        $response = config('response.common.success');
        $response['data'] = [
            'stock_count' => Common::formatNumber(Stock::sum('unit')),
            'item_count' => Common::formatNumber(Item::count()),
        ];
        return response()->json($response, 200);
    }

}
