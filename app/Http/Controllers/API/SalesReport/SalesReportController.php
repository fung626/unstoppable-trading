<?php

namespace App\Http\Controllers\API\SalesReport;

use App\Http\Controllers\Controller;
use App\Models\Goods\Stock\Stock;
use App\Mylibs\Common;
use App\Mylibs\SalesReport;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SalesReportController extends Controller
{
    //
    public function get(Request $request)
    {
        $from = Carbon::now()->addMonth(-3);
        $to = Carbon::now();
        $average = SalesReport::averageInventory($from, $to);
        $turnover = SalesReport::inventoryTurnover($from, $to);
        $change = SalesReport::change();
        $DIO = SalesReport::DIO();
        $response = config('response.common.success');
        $response['data'] = [
            'last_30days_stock_costs' => Common::formatPrice(Stock::where([
                'type' => 'PURCHASE',
            ])->whereBetween('created_at', [Carbon::now()->addDay(-30) . " 00:00:00", $to . " 23:59:59"])
                    ->sum('unit_price')),
            'last_30days_shipping_costs' => Common::formatPrice(Stock::where([
                'type' => 'SHIPPING',
            ])->whereBetween('created_at', [Carbon::now()->addDay(-30) . " 00:00:00", $to . " 23:59:59"])
                    ->sum('unit_price')),
            'average_inventory' => Common::formatPrice($average),
            'inventory_turnover' => Common::formatPrice($turnover),
            'inventory_change' => Common::formatPrice($change),
            'inventory_dio' => Common::formatPrice($DIO),
        ];
        return response()->json($response, 200);
    }
}
