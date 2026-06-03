<?php

namespace App\Http\Controllers\API\Config;

use App\Http\Controllers\Controller;
use App\Models\Config\CountryCode;
use Illuminate\Http\Request;

class WebController extends Controller
{
    //
    public function get(Request $request)
    {
        $data = [];
        $countryCodes = CountryCode::get();

        $data['country_codes'] = $countryCodes;

        $response = config('response.common.success');
        $response['data'] = $data;
        return response()->json($response, 200);
    }

}