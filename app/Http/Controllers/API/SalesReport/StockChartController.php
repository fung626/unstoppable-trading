<?php

namespace App\Http\Controllers\API\SalesReport;

use App\Http\Controllers\Controller;
use App\Mylibs\Common;
use App\Mylibs\SalesReport;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StockChartController extends Controller
{
    //
    public function get(Request $request)
    {
        $from = Carbon::now()->addMonth(-6);
        $to = Carbon::now();
        $range = Common::getMonthsFromRange($from, $to);

        $stock = SalesReport::stockLineChart($from, $to, 'cost_price', 'PURCHASE');
        $shipping = SalesReport::stockLineChart($from, $to, 'cost_price', 'SHIPPING');

        $response = config('response.common.success');
        $response['data'] = [
            'labels' => $range,
            'datasets' => [
                [
                    'label' => __('Stock'),
                    'backgroundColor' => 'rgba(220, 220, 220, 0.2)',
                    'borderColor' => 'rgba(220, 220, 220, 1)',
                    'pointHoverBackgroundColor' => 'rgba(220, 220, 220, 1)',
                    'pointBorderColor' => '#fff',
                    'borderWidth' => 2,
                    'data' => $stock,
                    'fill' => true,
                ],
                [
                    'label' => __('Shipping'),
                    'backgroundColor' => 'transparent',
                    'borderColor' => 'rgba(151, 187, 205, 1)',
                    'pointHoverBackgroundColor' => 'rgba(151, 187, 205, 1)',
                    'pointBorderColor' => '#fff',
                    'borderWidth' => 2,
                    'data' => $shipping,
                ],
            ],
            'options' => [
                'maintainAspectRatio' => false,
                'plugins' => [
                    'legend' => [
                        'display' => false,
                    ],
                ],
                'scales' => [
                    'x' => [
                        'grid' => [
                            'drawOnChartArea' => false,
                        ],
                    ],
                    'y' => [
                        'ticks' => [
                            // 'beginAtZero' => true,
                            // 'maxTicksLimit' => 5,
                            // 'stepSize' => ceil(250 / 5),
                            // 'max' => 250,
                        ],
                    ],
                ],
                'elements' => [
                    'line' => [
                        'tension' => 0.4,
                    ],
                    'point' => [
                        'radius' => 0,
                        'hitRadius' => 10,
                        'hoverRadius' => 4,
                        'hoverBorderWidth' => 3,
                    ],
                ],
            ],
        ];
        return response()->json($response, 200);
    }
}
