<?php

namespace App\Http\Controllers\API\Storage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FontCotroller extends Controller
{
    //
    public function get(Request $request)
    {
        $font = $request->filled('font') ? request('font') : 'AirbnbCereal';
        $type = $request->filled('type') ? request('type') : 'Medium';
        // $file = Storage::get('public/font/DFLiSong-Medium.ttf');
        $file = Storage::get('public/font/' . request('font') . '/' . request('font') . '-' . request('type') . '.ttf');
        $encoded = base64_encode($file);
        $response = config('response.common.success');
        $response['data'] = $encoded;
        return response()->json($response, 200);
    }

}