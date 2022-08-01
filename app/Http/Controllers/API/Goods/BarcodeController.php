<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Models\Goods\Item;
use App\Models\Goods\Purchase\Purchase;
use App\Mylibs\Goods as GoodsLib;
use Illuminate\Http\Request;
use Validator;

class BarcodeController extends Controller
{
    //

    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "code" => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $response = config('response.common.success');
        $item = Item::where(['barcode' => request('code')])->first();

        // dd($results);
        $response['data'] = [
            'goods_item' => $item,
            'formatted_goods' => GoodsLib::formatPurchaseItems($item ? $item->goods_id : null),
            'purchase' => Purchase::where(['id' => request('code')])->first(),
        ];
        return response()->json($response, 200);
    }

}