<?php

namespace App\Http\Controllers\API\SalesReport;

use App\Http\Controllers\Controller;
use App\Mylibs\Common;
use App\Mylibs\SalesReport;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InventoryTurnoverController extends Controller
{
    //
    public function get(Request $request)
    {
        $from = Carbon::now()->addMonth(-3);
        $to = Carbon::now();
        $value = SalesReport::inventoryTurnover($from, $to);
        $response = config('response.common.success');
        $response['data'] = [
            'value' => Common::formatNumber($value),
        ];
        return response()->json($response, 200);
    }
}