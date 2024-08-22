<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    //
    public function index($filename)
    {
        $path = storage_path('app/public/images/' . $filename);
        dd($path);
        if (!Storage::exists($path)) {
            abort(404);
        }

        // $file = Storage::get($path);
        // $type = Storage::mimeType($path);
        // $response = Response::make($file, 200)->header("Content-Type", $type);

        // return $response;
    }
}
