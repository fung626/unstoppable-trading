<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Models\Goods\Shipping;
use App\Mylibs\Common;
use App\Mylibs\Statistics;
use Illuminate\Http\Request;

class MonthlyStatementContoller extends Controller
{
    //
    public function post(Request $request)
    {

        $data = [];
        $months = Statistics::months();
        foreach ($months as $x) {
            $result = Shipping::with([
                'shippingStocks',
                'shippingStocks.stock',
            ])->when($request->filled(['client_id']), function ($query) {
                $client_id = trim(request('client_id'));
                return $query->where(function ($query) use ($client_id) {
                    $query->where('client_id', $client_id);
                });
            })->whereYear('updated_at', '=', $x->year)
                ->whereMonth('updated_at', '=', $x->month)
                ->get();

            $amount = 0;
            $shippings = [];
            if (count($result) > 0) {
                foreach ($result as $y) {
                    $subTotal = 0;
                    if ($y->shippingStocks && count($y->shippingStocks) > 0) {
                        // dd($result);
                        foreach ($y->shippingStocks as $z) {
                            // dd($z->stock->unit_price, abs($z->stock->unit));
                            $amount += $z->stock->unit_price * abs($z->stock->unit);
                            $subTotal += $z->stock->unit_price * abs($z->stock->unit);
                        }
                        $shippings[] = [
                            'generated_id' => $y->generated_id,
                            'delivered_at' => $y->delivered_at,
                            'sub_total' => Common::formatPrice($subTotal),
                        ];
                    }
                }
            }
            $data[] = [
                'amount' => Common::formatPrice($amount),
                'year' => $x->year,
                'month' => $x->month,
                'shippings' => $shippings,
                'actions' => [
                    [
                        'key' => 1,
                        'title' => __("Export"),
                        'color' => "info",
                        'type' => "Export",
                        'disabled' => count($shippings) > 0 ? false : true,
                    ],
                ],
            ];

        }

        $response = config('response.common.success');
        $response['data'] = $data;
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {

    }

}
