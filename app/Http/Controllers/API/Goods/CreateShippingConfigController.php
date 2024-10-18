<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Models\Client\Client;
use App\Mylibs\Goods as GoodsLib;
use Illuminate\Http\Request;

class CreateShippingConfigController extends Controller
{
    //
    public function get(Request $request)
    {
        $data = $request->filled(['items']) ? GoodsLib::formatShippingItems(request('items')) : [];
        $response = config('response.common.success');
        $response['data'] = [
            "items" => $data,
            "clients" => Client::get()->map(function ($client) {
                return [
                     ...$client->toArray(),
                    "title" => $client->number . "－" . $client->name,
                ];
            }),
        ];
        return response()->json($response, 200);
    }
}
