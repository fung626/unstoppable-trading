<?php

namespace App\Http\Controllers\Web\File;

use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class PdfController extends Controller
{
    //

    public function index($path = null)
    {
        if ($path) {
            $path = storage_path('app/pdf/' . $path);
            if (!File::exists($path)) {

            } else {

            }
        }
    }

}