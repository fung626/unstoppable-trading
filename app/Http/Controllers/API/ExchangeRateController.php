<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ExchangeRates;
use Illuminate\Http\Request;
use Validator;

class ExchangeRateController extends Controller
{
    //
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'base' => 'required|string|in:HKD,TWD',
            'symbol' => 'required|string|in:HKD,TWD',
            'rate' => 'required|min:0',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $result = ExchangeRates::where([
            'base' => request('base'),
            'symbol' => request('symbol'),
        ])->update([
            'rate' => request('rate'),
        ]);

        $response = config('response.common.success');
        $response['data'] = $result;

        return response()->json($response, 200);
    }

    public function get(Request $request)
    {
        $result = ExchangeRates::get();
        $response = config('response.common.success');
        $response['data'] = $result;
        return response()->json($response, 200);
    }

    public function details(Request $request)
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