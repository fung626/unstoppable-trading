<?php

namespace App\Http\Controllers\API\Goods\SalesReport;

use App\Http\Controllers\Controller;
use App\Mylibs\SalesReport;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InventoryTurnoverController extends Controller
{
    //
    public function get(Request $request)
    {
        $start = Carbon::today()->subMonths(3);
        $end = Carbon::today();
        $result = SalesReport::inventoryTurnover($start, $end);
        $response = config('response.common.success');
        $response['data'] = $result;
        return response()->json($response, 200);
    }
}
