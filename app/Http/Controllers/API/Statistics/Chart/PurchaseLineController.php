<?php

namespace App\Http\Controllers\API\Statistics\Chart;

use App\Http\Controllers\Controller;
use App\Models\Goods\Purchase\Purchase;
use App\Models\Goods\Shipping;
use App\Mylibs\Chart;
use App\Mylibs\Statistics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseLineController extends Controller
{
    //

    public function get(Request $request)
    {
        $purchase = Purchase::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(created_at) AS count '))
            ->groupBy(DB::raw('year, month'))
            ->orderBy(DB::raw('year, month'))
            ->get();

        $shipping = Shipping::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(created_at) AS count '))
            ->groupBy(DB::raw('year, month'))
            ->orderBy(DB::raw('year, month'))
            ->get();

        $data = [
            'labels' => Statistics::monthlyLabels(),
            'datasets' => [
                [
                    'data' => Statistics::renderMonthlyData($purchase),
                    'borderColor' => '#20a8d8',
                    'pointHoverBackgroundColor' => '#fff',
                    'label' => __('Purchase'),
                ],
                [
                    'data' => Statistics::renderMonthlyData($shipping),
                    'backgroundColor' => 'transparent',
                    'borderColor' => '#4dbd74',
                    'pointHoverBackgroundColor' => '#4dbd74',
                    'borderWidth' => 2,
                    'label' => __('Shipping'),
                ],
            ],
        ];
        $response = config('response.common.success');
        $response['data'] = $data;
        return response()->json($response, 200);
    }
}
