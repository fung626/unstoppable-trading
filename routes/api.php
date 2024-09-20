<?php

use App\Http\Controllers\API\Auth\ForgotPasswordController;
use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\ResetPasswordController;
use App\Http\Controllers\API\Client\ClientController;
use App\Http\Controllers\API\Config\WebController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\ExchangeRateController;
use App\Http\Controllers\API\Goods\BarcodeController;
use App\Http\Controllers\API\Goods\CategoryController;
use App\Http\Controllers\API\Goods\ContentController;
use App\Http\Controllers\API\Goods\CreateShippingConfigController;
use App\Http\Controllers\API\Goods\GoodsController;
use App\Http\Controllers\API\Goods\ItemController;
use App\Http\Controllers\API\Goods\PurchaseController;
use App\Http\Controllers\API\Goods\Purchase\InvoiceController as PurchaseInvoiceController;
use App\Http\Controllers\API\Goods\Purchase\StocktakeController;
use App\Http\Controllers\API\Goods\ShippingController;
use App\Http\Controllers\API\Goods\ShippingPurchaseQuickSearchController;
use App\Http\Controllers\API\Goods\Shipping\AlterationController;
use App\Http\Controllers\API\Goods\Shipping\AvailableShippingItemController;
use App\Http\Controllers\API\Goods\Shipping\InvoiceController as ShippingInvoiceController;
use App\Http\Controllers\API\Goods\Shipping\MailerController;
use App\Http\Controllers\API\Goods\Shipping\PackingController;
use App\Http\Controllers\API\Goods\StockCalendarController;
use App\Http\Controllers\API\Goods\StockController;
use App\Http\Controllers\API\Goods\SupplierController;
use App\Http\Controllers\API\Goods\WarehouseController;
use App\Http\Controllers\API\SalesReport\AverageInventoryController;
use App\Http\Controllers\API\SalesReport\ChartController;
use App\Http\Controllers\API\SalesReport\InventoryTurnoverController;
use App\Http\Controllers\API\SalesReport\SalesReportController;
use App\Http\Controllers\API\SalesReport\StockChartController;
use App\Http\Controllers\API\SalesReport\TopSalesController;
use App\Http\Controllers\API\SalesReport\TopStocksController;
use App\Http\Controllers\API\Statistics\Chart\PurchaseLineController;
use App\Http\Controllers\API\Statistics\Dashboard\CalloutController;
use App\Http\Controllers\API\Storage\FontCotroller;
use App\Http\Controllers\API\TestController;
use App\Http\Controllers\API\User\DutyCalendarController;
use App\Http\Controllers\API\User\DutyController;
use App\Http\Controllers\API\User\EmployeeController;
use App\Http\Controllers\API\User\PasswordController;
use App\Http\Controllers\API\User\PermissionController;
use App\Http\Controllers\API\User\ProfileController;
use App\Http\Controllers\API\User\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('test')->group(function () {
    Route::get('get', [TestController::class, 'get']);
    Route::post('post', [TestController::class, 'post']);
});

Route::prefix('auth')->group(function () {
    Route::post('login', [LoginController::class, 'index']);
    Route::post('forgotpassword/email', [ForgotPasswordController::class, 'forgot']);
    Route::post('forgotpassword/reset', [ForgotPasswordController::class, 'reset']);
    Route::post('forgotpassword/find', [ForgotPasswordController::class, 'find']);
});

Route::prefix('storage')->group(function () {
    Route::get('font/get', [FontCotroller::class, 'get']);
});

Route::prefix('auth')->middleware(['web', 'localization'])->group(function () {
    Route::get('password/reset', [ResetPasswordController::class, 'index']);
    Route::post('password/reset', [ResetPasswordController::class, 'post'])->name('password.reset');
});

Route::prefix('config')->middleware(['localization'])->group(function () {
    Route::get('web/get', [WebController::class, 'get']);
});

Route::prefix('dashboard')->middleware(['auth:api', 'localization'])->group(function () {
    Route::get('get', [DashboardController::class, 'get']);
});

Route::prefix('sales-reports')->middleware(['auth:api', 'scopes:sales-report', 'localization'])->group(function () {
    Route::get('get', [SalesReportController::class, 'get']);
    Route::get('average/inventory/get', [AverageInventoryController::class, 'get']);
    Route::get('inventory/turnover/get', [InventoryTurnoverController::class, 'get']);

    Route::get('top-sales/get', [TopSalesController::class, 'get']);
    Route::get('top-stocks/get', [TopStocksController::class, 'get']);

    Route::get('chart/get', [ChartController::class, 'get']);
    Route::get('stock-chart/get', [StockChartController::class, 'get']);
});

Route::prefix('users')->middleware(['auth:api', 'scopes:users', 'localization'])->group(function () {
    Route::post('create', [UserController::class, 'post']);
    Route::post('update', [UserController::class, 'update']);
    Route::post('get', [UserController::class, 'get']);
    Route::get('details', [UserController::class, 'details']);
    Route::delete('delete', [UserController::class, 'delete']);
    Route::post('export', [UserController::class, 'export']);
    // profile
    Route::get('profile/get', [ProfileController::class, 'get']);
    Route::post('profile/update', [ProfileController::class, 'update']);
    // employee
    Route::get('employee/get', [EmployeeController::class, 'get']);
    Route::post('employee/update', [EmployeeController::class, 'update']);
    // permission
    Route::get('permission/get', [PermissionController::class, 'get']);
    Route::post('permission/update', [PermissionController::class, 'update']);
    // duty
    Route::post('duty/create', [DutyController::class, 'post']);
    Route::post('duty/update', [DutyController::class, 'update']);
    Route::post('duty/get', [DutyController::class, 'get']);
    Route::get('duty/details', [DutyController::class, 'details']);
    Route::delete('duty/delete', [DutyController::class, 'delete']);
    Route::post('duty/export', [DutyController::class, 'export']);
    // password
    // Route::post('profile/password/update', [PasswordController::class, 'post']);
});

Route::prefix('users')->middleware(['auth:api', 'localization'])->group(function () {
    // duty
    Route::post('duty/calendar/get', [DutyCalendarController::class, 'get']);
    // password
    Route::post('profile/password/update', [PasswordController::class, 'post']);
});

Route::prefix('clients')->middleware(['auth:api', 'scopes:clients', 'localization'])->group(function () {
    Route::post('create', [ClientController::class, 'post']);
    Route::post('update', [ClientController::class, 'update']);
    Route::post('get', [ClientController::class, 'get']);
    Route::get('details', [ClientController::class, 'details']);
    Route::delete('delete', [ClientController::class, 'delete']);
    Route::post('export', [ClientController::class, 'export']);
});

Route::prefix('goods/suppliers')->middleware(['auth:api', 'scopes:suppliers', 'localization'])->group(function () {
    Route::post('create', [SupplierController::class, 'post']);
    Route::post('update', [SupplierController::class, 'update']);
    Route::post('get', [SupplierController::class, 'get']);
    Route::get('details', [SupplierController::class, 'details']);
    Route::delete('delete', [SupplierController::class, 'delete']);
    Route::post('export', [SupplierController::class, 'export']);
});

Route::prefix('categories')->middleware(['auth:api', 'scopes:categories', 'localization'])->group(function () {
    Route::post('create', [CategoryController::class, 'post']);
    Route::post('update', [CategoryController::class, 'update']);
    Route::post('get', [CategoryController::class, 'get']);
    Route::get('details', [CategoryController::class, 'details']);
    Route::delete('delete', [CategoryController::class, 'delete']);
    Route::post('export', [CategoryController::class, 'export']);
});

Route::prefix('goods')->middleware(['auth:api', 'scopes:goods', 'localization'])->group(function () {
    Route::post('create', [GoodsController::class, 'post']);
    Route::post('update', [GoodsController::class, 'update']);
    Route::post('get', [GoodsController::class, 'get']);
    Route::get('details', [GoodsController::class, 'details']);
    Route::delete('delete', [GoodsController::class, 'delete']);
    Route::post('export', [GoodsController::class, 'export']);
    Route::post('shippings/purchase/quicksearch/get', [ShippingPurchaseQuickSearchController::class, 'get']);
});

Route::prefix('goods/contents')->middleware(['auth:api', 'scopes:goods', 'localization'])->group(function () {
    Route::post('update', [ContentController::class, 'update']);
    Route::post('get', [ContentController::class, 'get']);
    Route::get('details', [ContentController::class, 'details']);
    Route::delete('delete', [ContentController::class, 'delete']);
    Route::post('export', [ContentController::class, 'export']);
});

Route::get('goods/purchases/items', [PurchaseController::class, 'items']);

Route::prefix('goods/purchases')->middleware(['auth:api', 'scopes:purchases', 'localization'])->group(function () {
    Route::post('create', [PurchaseController::class, 'post']);
    Route::get('create/values', [PurchaseController::class, 'postDefaultValues']);
    Route::post('update', [PurchaseController::class, 'update']);
    Route::post('get', [PurchaseController::class, 'get']);
    Route::get('details', [PurchaseController::class, 'details']);
    Route::post('export', [PurchaseController::class, 'export']);
});

Route::prefix('goods/purchases/invoices')->middleware(['auth:api', 'scopes:purchases', 'localization'])->group(function () {
    Route::get('items', [PurchaseInvoiceController::class, 'items']);
    Route::get('details', [PurchaseInvoiceController::class, 'details']);
    Route::post('export', [PurchaseInvoiceController::class, 'export']);
});

Route::prefix('goods/purchases/stocktakes')->middleware(['auth:api', 'scopes:stocktakes', 'localization'])->group(function () {
    Route::post('create', [StocktakeController::class, 'post']);
    Route::get('details', [StocktakeController::class, 'details']);
});

Route::prefix('goods/shippings')->middleware(['auth:api', 'scopes:shippings', 'localization'])->group(function () {
    Route::post('create', [ShippingController::class, 'post']);
    Route::post('get', [ShippingController::class, 'get']);
    Route::get('details', [ShippingController::class, 'details']);
    Route::post('update', [ShippingController::class, 'update']);
    Route::post('export', [ShippingController::class, 'export']);
    Route::post('format', [ShippingController::class, 'format']);
});

Route::prefix('goods/shippings/packing')->middleware(['auth:api', 'scopes:shippings', 'localization'])->group(function () {
    Route::post('export', [PackingController::class, 'export']);
});

Route::prefix('goods/shippings/invoice')->middleware(['auth:api', 'scopes:shippings', 'localization'])->group(function () {
    Route::post('export', [InvoiceController::class, 'export']);
});

Route::prefix('goods/create-shipping-config')->middleware(['auth:api', 'scopes:shippings', 'localization'])->group(function () {
    Route::post('get', [CreateShippingConfigController::class, 'get']);
});

Route::prefix('goods/shippings/alteration')->middleware(['auth:api', 'scopes:shippings', 'localization'])->group(function () {
    Route::post('get', [AlterationController::class, 'get']);
    Route::post('export', [AlterationController::class, 'export']);
});

Route::prefix('goods/shippings/available-shippings-items')->middleware(['auth:api', 'scopes:shippings', 'localization'])->group(function () {
    Route::post('get', [AvailableShippingItemController::class, 'get']);
});

Route::prefix('goods/shippings/packings')->middleware(['auth:api', 'scopes:shippings', 'localization'])->group(function () {
    Route::post('export', [PackingController::class, 'export']);
});

Route::prefix('goods/shippings/mailer')->middleware(['auth:api', 'scopes:shippings', 'localization'])->group(function () {
    Route::post('export', [MailerController::class, 'export']);
});

Route::prefix('goods/shippings/invoice')->middleware(['auth:api', 'scopes:shippings', 'localization'])->group(function () {
    Route::post('export', [ShippingInvoiceController::class, 'export']);
});

Route::prefix('goods/items')->middleware(['auth:api', 'scopes:goods', 'localization'])->group(function () {
    Route::post('update', [ItemController::class, 'update']);
    Route::post('get', [ItemController::class, 'get']);
    Route::get('details', [ItemController::class, 'details']);
    Route::delete('delete', [ItemController::class, 'delete']);
    Route::post('export', [ItemController::class, 'export']);
});

Route::prefix('goods/warehouses')->middleware(['auth:api', 'scopes:warehouses', 'localization'])->group(function () {
    Route::post('create', [WarehouseController::class, 'post']);
    Route::post('update', [WarehouseController::class, 'update']);
    Route::post('get', [WarehouseController::class, 'get']);
    Route::get('details', [WarehouseController::class, 'details']);
    Route::delete('delete', [WarehouseController::class, 'delete']);
    Route::post('export', [WarehouseController::class, 'export']);
});

Route::prefix('goods/stocks')->middleware(['auth:api', 'scopes:stocks', 'localization'])->group(function () {
    Route::post('get', [StockController::class, 'get']);
    Route::post('export', [StockController::class, 'export']);
    Route::post('calendar/get', [StockCalendarController::class, 'get']);
});

Route::prefix('goods/barcode')->middleware(['auth:api', 'scopes:goods', 'localization'])->group(function () {
    Route::post('get', [BarcodeController::class, 'get']);
});

Route::prefix('statistics/chart')->middleware(['auth:api', 'localization'])->group(function () {
    Route::get('purchase-line/get', [PurchaseLineController::class, 'get']);
});

Route::prefix('statistics/dashboard')->middleware(['auth:api', 'localization'])->group(function () {
    Route::post('callout/get', [CalloutController::class, 'get']);
});

Route::prefix('exchange-rates')->middleware(['auth:api', 'localization'])->group(function () {
    Route::post('update', [ExchangeRateController::class, 'update']);
    Route::post('get', [ExchangeRateController::class, 'get']);
    Route::post('details', [ExchangeRateController::class, 'details']);
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');
