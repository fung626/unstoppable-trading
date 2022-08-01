<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ExchangeRates;
use Illuminate\Http\Request;
use Validator;

class ExchangeRateController extends Controller
{
    //

    public function get(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'base' => 'required|string|in:HKD,TWD',
            'symbol' => 'required|string|in:HKD,TWD',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        if (request('base') === request('symbol')) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $result = ExchangeRates::where([
            'base' => request('base'),
            'symbol' => request('symbol'),
        ])->first();

        $response = config('response.common.success');
        $response['data'] = $result;

        return response()->json($response, 200);
    }

}
