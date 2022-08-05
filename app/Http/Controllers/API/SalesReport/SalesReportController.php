<?php

namespace App\Http\Controllers\API\SalesReport;

use App\Http\Controllers\Controller;
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
            'average_inventory' => Common::formatPrice($average),
            'inventory_turnover' => Common::formatPrice($turnover),
            'inventory_change' => Common::formatPrice($change),
            'inventory_dio' => Common::formatPrice($DIO),
        ];
        return response()->json($response, 200);
    }
}