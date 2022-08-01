<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/{any}', 'Web\PageController@index')->where('any', '.*');
// Route::get('image/{path}', 'Web\FileController@image')->where(['path' => '.*']);
// Route::get('pdf/{path}', 'Web\CMS\FileController@pdf')->where(['path' => '.*']);