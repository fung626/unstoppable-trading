<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Models\Goods\Purchase\Purchase;
use App\Models\Goods\Shipping;
use Illuminate\Http\Request;
use Validator;

class StockCalendarController extends Controller
{
    //
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|in:shipping,purchase',
            'from' => 'date_format:Y-m-d',
            'to' => 'date_format:Y-m-d',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        switch (request('type')) {
            case 'shipping':
                $result = Shipping::when($request->filled(['from', 'to']), function ($query) {
                    $from = date(request('from'));
                    $to = date(request('to'));
                    return $query->where(function ($query) use ($from, $to) {
                        $query->whereBetween('created_at', [$from . " 00:00:00", $to . " 23:59:59"]);
                    });
                })->get();
                break;
            case 'purchase':
                $result = Purchase::when($request->filled(['from', 'to']), function ($query) {
                    $from = date(request('from'));
                    $to = date(request('to'));
                    return $query->where(function ($query) use ($from, $to) {
                        $query->whereBetween('created_at', [$from . " 00:00:00", $to . " 23:59:59"]);
                    });
                })->get();
                break;
        }

        $response = config('response.common.success');
        $response['data'] = $result;
        return response()->json($response, 200);
    }
}