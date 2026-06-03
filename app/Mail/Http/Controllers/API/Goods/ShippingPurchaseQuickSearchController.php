<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Models\Goods\Purchase\Purchase;
use App\Models\Goods\Shipping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ShippingPurchaseQuickSearchController extends Controller
{
    //
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'required',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $array = [];
        if (strpos(request('search'), '-') !== false) {
            $search = explode('-', request('search'));
            $shipping = Shipping::where(function ($query) use ($search) {
                foreach ($search as $item) {
                    $query->where('client_number', 'LIKE', '%' . $item . '%')
                        ->orWhere('number', 'LIKE', '%' . $item . '%');
                }
            })->get();
            $purchase = Purchase::where(function ($query) use ($search) {
                foreach ($search as $item) {
                    $query->where('to_company_number', 'LIKE', '%' . $item . '%')
                        ->orWhere('number', 'LIKE', '%' . $item . '%');
                }
            })->get();
        } else {
            $shipping = Shipping::where('client_number', 'LIKE', '%' . request('search') . '%')
                ->orWhere('number', 'LIKE', '%' . request('search') . '%')
                ->get();
            $purchase = Purchase::where('to_company_number', 'LIKE', '%' . request('search') . '%')
                ->orWhere('number', 'LIKE', '%' . request('search') . '%')
                ->get();
        }

        foreach ($shipping as $item) {
            $array[] = [
                'id' => $item->id,
                'name' => $item->generated_id . '-' . __('Shipping') . '-' . __($item->status),
                'generated_id' => $item->generated_id,
                'status' => $item->status,
                'type' => 'SHIPPING',
            ];
        }
        foreach ($purchase as $item) {
            $array[] = [
                'id' => $item->id,
                'name' => $item->generated_id . '-' . __('Purchase') . '-' . __($item->status),
                'generated_id' => $item->generated_id,
                'status' => $item->status,
                'type' => 'PURCHASE',
            ];
        }
        // dd($array);
        $response = config('response.common.success');
        $response['data'] = $array;
        return response()->json($response, 200);
    }
}