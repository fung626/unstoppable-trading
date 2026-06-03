<?php

namespace App\Http\Controllers\API\Goods\Shipping;

use App\Http\Controllers\Controller;
use App\Models\Client\Client;
use App\Models\Goods\Shipping;
use App\Mylibs\MyPhpOffice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PackingController extends Controller
{

    //
    public function export(Request $request)
    {    
        $validator = Validator::make($request->all(), [
            'shipping_id' => 'required_without:client_id|string|exists:goods_shippings,id',
            'client_id' => 'required_without:shipping_id|string|exists:clients,id',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['errors'] = $validator->errors();
            return response()->json($response, 400);
        }

        $data = [];
        $client = null;

        if ($request->filled('shipping_id')) {
            $shipping = Shipping::where(['id' => request('shipping_id')])->first();
            if (!$shipping) {
                $response = config('response.common.fail.parameter');
                return response()->json($response, 400);
            }
            $client = Client::where(['id' => $shipping->client_id])->first();
        } else {
            $client = Client::where(['id' => request('client_id')])->first();
        }

        if (!$client) {
            $response = config('response.common.fail.parameter');
            $response['msg'] = __('Client not found');
            return response()->json($response, 400);
        }

        $data = [
            'name' => $client->name,
            'address' => $client->address,
        ];
        $path = MyPhpOffice::exportPackingWithPath($client->name, $data, 'pdf');

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }
}