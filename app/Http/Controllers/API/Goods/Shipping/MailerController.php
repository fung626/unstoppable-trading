<?php

namespace App\Http\Controllers\API\Goods\Shipping;

use App\Http\Controllers\Controller;
use App\Models\Goods\Shipping;
use App\Mylibs\Common;
use App\Mylibs\MyPhpOffice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MailerController extends Controller
{
    //
    public function export(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $shipping = Shipping::select()->where(['id' => request('id')])->first();

        $data = [
            'name' => $shipping->client_name,
            'address' => $shipping->client_address,
            'phone' => Common::formatPhoneNumber($shipping->client_phone),
            'contact' => $shipping->client_contact,
        ];

        $path = MyPhpOffice::exportMailerWithPath('packing', $data, 'pdf');

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }
}
