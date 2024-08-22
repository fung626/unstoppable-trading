<?php

use App\Http\Controllers\API\Auth\MyWelcomeController;
use App\Http\Controllers\Web\ImageController;
use App\Http\Controllers\Web\PageController;
use App\Http\Middleware\Localization;
use App\Http\Middleware\MyWelcomesNewUsers;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::prefix('welcome')->middleware(['web', MyWelcomesNewUsers::class, Localization::class])->group(function () {
    Route::get('{user}', [MyWelcomeController::class, 'showWelcomeForm'])->name('welcome');
    Route::post('{user}', [MyWelcomeController::class, 'savePassword'])->name('password.initial');
});

Route::get('image/{filename}', [ImageController::class, 'index']);

Route::get('/{any}', [PageController::class, 'index'])->where('any', '.*');
