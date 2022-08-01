<?php

namespace App\Http\Controllers\API\SalesReport;

use App\Http\Controllers\Controller;
use App\Mylibs\SalesReport;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DailySalesReportController extends Controller
{
    //
    public function get(Request $request)
    {
        $from = Carbon::now()->addDay(-7);
        $to = Carbon::now();
        $data = SalesReport::daily($from, $to);
        $response = config('response.common.success');
        $response['data'] = $data;
        return response()->json($response, 200);
    }
}
