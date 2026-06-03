<?php

namespace App\Http\Controllers\API\SalesReport;

use App\Http\Controllers\Controller;
use App\Mylibs\Common;
use App\Mylibs\SalesReport;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    //
    public function get(Request $request)
    {
        $from = Carbon::now()->addMonth(-12);
        $to = Carbon::now();
        $labels = Common::getMonthsFromRange($from, $to, 'M Y');
        $range = Common::getMonthsFromRange($from, $to);
        $averages = [];
        $turnovers = [];
        $changes = [];
        $DIOs = [];
        foreach ($range as $item) {
            $from = Carbon::createFromFormat('Y-m-d', $item . '-01')->addMonth(-3)->format('Y-m-d');
            $to = Carbon::createFromFormat('Y-m-d', $item . '-01')->format('Y-m-d');
            $average = SalesReport::averageInventory($from, $to);
            $turnover = SalesReport::inventoryTurnover($from, $to);
            $change = SalesReport::change($item);
            $DIO = SalesReport::DIO();
            $averages[] = round($average, 2, PHP_ROUND_HALF_UP);
            $turnovers[] = round($turnover, 2, PHP_ROUND_HALF_UP);
            $changes[] = round($change, 2, PHP_ROUND_HALF_UP);
            $DIOs[] = round($DIO, 2, PHP_ROUND_HALF_UP);
        }

        // dd($averages, $turnovers, $changes, $DIOs);

        $response = config('response.common.success');
        $response['data'] = [
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => __('Last 3 Months Average Inventory Cost'),
                    'backgroundColor' => 'rgba(220, 220, 220, 0.2)',
                    'borderColor' => 'rgba(220, 220, 220, 1)',
                    'pointBackgroundColor' => 'rgba(220, 220, 220, 1)',
                    'pointBorderColor' => '#fff',
                    'data' => $averages,
                ],
                [
                    'label' => __('Last 3 Months Inventory Turnover Cost'),
                    'backgroundColor' => 'transparent',
                    'borderColor' => 'rgba(151, 187, 205, 1)',
                    'pointBackgroundColor' => 'rgba(151, 187, 205, 1)',
                    'pointBorderColor' => '#fff',
                    'borderWidth' => 2,
                    'data' => $turnovers,
                ],
                [
                    'label' => __('Inventory Change'),
                    'backgroundColor' => 'transparent',
                    'borderColor' => '#f87979',
                    'pointHoverBackgroundColor' => '#f87979',
                    'pointBorderColor' => '#fff',
                    'borderWidth' => 2,
                    'data' => $changes,
                ],
                [
                    'label' => __('DIO'),
                    'backgroundColor' => 'transparent',
                    'borderColor' => '#41B883',
                    'pointHoverBackgroundColor' => '#41B883',
                    'pointBorderColor' => '#fff',
                    'borderWidth' => 2,
                    'data' => $DIOs,
                ],
            ],
        ];
        return response()->json($response, 200);
    }
}