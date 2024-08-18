<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Models\Client\Client;
use App\Mylibs\Goods as GoodsLib;
use Illuminate\Http\Request;
use Validator;

class CreateShippingConfigController extends Controller
{
    //
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $data = GoodsLib::formatShippingItems(request('items'));

        $response = config('response.common.success');
        $response['data'] = [
            "items" => $data,
            "clients" => Client::get(),
        ];

        return response()->json($response, 200);
    }
}
