<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['namespace' => 'API', 'middleware' => ['localization'], 'prefix' => 'test'], function () {
    Route::get('get', 'TestController@get');
    Route::post('post', 'TestController@post');
});

Route::group(['namespace' => 'API\Storage', 'prefix' => 'storage'], function () {
    Route::get('font', 'FontCotroller@get');
});

Route::group(['namespace' => 'API', 'prefix' => 'export'], function () {
    Route::post('data', 'ExportDataController@post');
});

Route::group(['namespace' => 'API\Auth', 'middleware' => ['web', 'welcome.user', 'localization'], 'prefix' => 'welcome'], function () {
    Route::get('{user}', ['as' => 'welcome', 'uses' => 'MyWelcomeController@showWelcomeForm']);
    Route::post('{user}', ['as' => 'password.initial', 'uses' => 'MyWelcomeController@savePassword']);
});

Route::group(['namespace' => 'API\Auth', 'middleware' => ['localization'], 'prefix' => 'auth'], function () {
    Route::post('login', 'LoginController@index');
    Route::post('forgot/password/email', 'ForgotPasswordController@forgot');
    Route::post('forgot/password/reset', 'ForgotPasswordController@reset');
    Route::post('forgot/password/find', 'ForgotPasswordController@find');
});

Route::group(['namespace' => 'API\Auth', 'middleware' => ['web', 'localization'], 'prefix' => 'auth'], function () {
    // Route::post('forgot/password/email', ['as' => 'password.forgot', 'uses' => 'ForgotPasswordController@post']);
    // Route::get('forgot/password/email', ['as' => 'password.email', 'uses' => 'ForgotPasswordController@get']);
    // Route::get('password/reset/{token}', ['as' => 'password.request', 'uses' => 'ResetPasswordController@find']);
    Route::get('password/reset', ['as' => 'password.reset', 'uses' => 'ResetPasswordController@index']);
    Route::post('password/reset', ['as' => 'password.reset', 'uses' => 'ResetPasswordController@post']);
});

// Route::group(['middleware' => ['auth:api']], function () {

// });

Route::group(['namespace' => 'API\Config', 'middleware' => ['localization'], 'prefix' => 'config'], function () {
    Route::get('web/get', ['uses' => 'WebController@get']);
});

Route::group(['namespace' => 'API', 'middleware' => ['auth:api', 'localization'], 'prefix' => 'dashboard'], function () {
    Route::get('get', ['uses' => 'DashboardController@get']);
});

Route::group(['namespace' => 'API\SalesReport', 'middleware' => ['auth:api', 'scopes:salesreport', 'localization'], 'prefix' => 'salesreport'], function () {
    Route::get('get', ['uses' => 'SalesReportController@get']);
    Route::get('average/inventory/get', ['uses' => 'AverageInventoryController@get']);
    Route::get('inventory/turnover/get', ['uses' => 'InventoryTurnoverController@get']);

    Route::get('topsales/get', 'TopSalesController@get');
    Route::get('topstocks/get', 'TopStocksController@get');

    Route::get('chart/get', ['uses' => 'ChartController@get']);
    Route::get('stockchart/get', ['uses' => 'StockChartController@get']);
});

Route::group(['namespace' => 'API\User', 'middleware' => ['auth:api', 'scopes:user', 'localization'], 'prefix' => 'user'], function () {
    Route::post('create', ['uses' => 'UserController@post']);
    Route::post('update', ['uses' => 'UserController@update']);
    Route::post('get', ['uses' => 'UserController@get']);
    Route::get('details', ['uses' => 'UserController@details']);
    Route::post('delete', ['uses' => 'UserController@delete']);
    Route::post('export', ['uses' => 'UserController@export']);
    // profile
    Route::get('profile/get', ['uses' => 'ProfileController@get']);
    Route::post('profile/update', ['uses' => 'ProfileController@update']);
    // employee
    Route::get('employee/get', ['uses' => 'EmployeeController@get']);
    Route::post('employee/update', ['uses' => 'EmployeeController@update']);
    // permission
    Route::get('permission/get', ['uses' => 'PermissionController@get']);
    Route::post('permission/update', ['uses' => 'PermissionController@update']);
    // password
    Route::post('profile/password/update', ['uses' => 'PasswordController@post']);
});

Route::group(['namespace' => 'API\User', 'middleware' => ['auth:api', 'scopes:duty', 'localization'], 'prefix' => 'user/duty'], function () {
    // duty
    Route::post('create', ['uses' => 'DutyController@post']);
    Route::post('update', ['uses' => 'DutyController@update']);
    Route::post('get', ['uses' => 'DutyController@get']);
    Route::get('details', ['uses' => 'DutyController@details']);
    Route::post('delete', ['uses' => 'DutyController@delete']);
    Route::post('export', ['uses' => 'DutyController@export']);
});

Route::group(['namespace' => 'API\User', 'middleware' => ['auth:api', 'scopes:leave', 'localization'], 'prefix' => 'user/leave'], function () {
    // leave
    Route::post('create', ['uses' => 'DutyController@post']);
    Route::post('update', ['uses' => 'DutyController@update']);
    Route::post('get', ['uses' => 'DutyController@get']);
    Route::get('details', ['uses' => 'DutyController@details']);
    Route::post('delete', ['uses' => 'DutyController@delete']);
    Route::post('export', ['uses' => 'DutyController@export']);
});

Route::group(['namespace' => 'API\User', 'middleware' => ['auth:api', 'localization'], 'prefix' => 'user'], function () {
    // duty
    Route::post('duty/calendar/get', ['uses' => 'DutyCalendarController@get']);
    // password
    Route::post('profile/password/update', ['uses' => 'PasswordController@post']);
});

Route::group(['namespace' => 'API\Client', 'middleware' => ['auth:api', 'scopes:client', 'localization'], 'prefix' => 'client'], function () {
    Route::post('create', ['uses' => 'ClientController@post']);
    Route::post('update', ['uses' => 'ClientController@update']);
    Route::post('get', ['uses' => 'ClientController@get']);
    Route::get('details', ['uses' => 'ClientController@details']);
    Route::post('delete', ['uses' => 'ClientController@delete']);
    Route::post('export', ['uses' => 'ClientController@export']);
});

Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:supplier', 'localization'], 'prefix' => 'goods/supplier'], function () {
    Route::post('create', ['uses' => 'SupplierController@post']);
    Route::post('update', ['uses' => 'SupplierController@update']);
    Route::post('get', ['uses' => 'SupplierController@get']);
    Route::get('details', ['uses' => 'SupplierController@details']);
    Route::post('delete', ['uses' => 'SupplierController@delete']);
    Route::post('export', ['uses' => 'SupplierController@export']);
});

Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:category', 'localization'], 'prefix' => 'goods/category'], function () {
    Route::post('create', ['uses' => 'CategoryController@post']);
    Route::post('update', ['uses' => 'CategoryController@update']);
    Route::post('get', ['uses' => 'CategoryController@get']);
    Route::get('details', ['uses' => 'CategoryController@details']);
    Route::post('delete', ['uses' => 'CategoryController@delete']);
    Route::post('export', ['uses' => 'CategoryController@export']);
});

Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:goods', 'localization'], 'prefix' => 'goods'], function () {
    Route::post('create', ['uses' => 'GoodsController@post']);
    Route::post('update', ['uses' => 'GoodsController@update']);
    Route::post('get', ['uses' => 'GoodsController@get']);
    Route::get('details', ['uses' => 'GoodsController@details']);
    Route::post('delete', ['uses' => 'GoodsController@delete']);
    Route::post('export', ['uses' => 'GoodsController@export']);
    Route::post('shipping/purchase/quicksearch/get', ['uses' => 'ShippingPurchaseQuickSearchController@get']);
});

Route::get('goods/purchase/items', ['uses' => 'API\Goods\PurchaseController@items']);
Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:purchase', 'localization'], 'prefix' => 'goods/purchase'], function () {
    Route::post('create', ['uses' => 'PurchaseController@post']);
    Route::get('create/values', ['uses' => 'PurchaseController@postDefaultValues']);
    Route::post('update', ['uses' => 'PurchaseController@update']);
    Route::post('get', ['uses' => 'PurchaseController@get']);
    Route::get('details', ['uses' => 'PurchaseController@details']);
    Route::post('export', ['uses' => 'PurchaseController@export']);
});

Route::group(['namespace' => 'API\Goods\Purchase', 'middleware' => ['auth:api', 'scopes:stocktake', 'localization'], 'prefix' => 'goods/purchase/stocktake'], function () {
    Route::post('create', ['uses' => 'StockTakeController@post']);
    Route::get('details', ['uses' => 'StockTakeController@details']);
});

Route::group(['namespace' => 'API\Goods\Import', 'middleware' => ['auth:api', 'localization'], 'prefix' => 'goods/import'], function () {
    Route::post('', ['uses' => 'ImportController@post']);
    // Route::post('create', ['uses' => 'ImportController@post']);
    Route::get('status/{jobId}', ['uses' => 'StatusController@get']);
    Route::get('jobs', ['uses' => 'JobsController@get']);
});

// Route::get('goods/purchase/invoice/details', ['uses' => 'API\Goods\Purchase\InvoiceController@details']);
Route::group(['namespace' => 'API\Goods\Purchase', 'middleware' => ['auth:api', 'scopes:purchase', 'localization'], 'prefix' => 'goods/purchase/invoice'], function () {
    // Route::post('create', ['uses' => 'InvoiceController@post']);
    // Route::post('get', ['uses' => 'InvoiceController@get']);
    Route::get('details', ['uses' => 'InvoiceController@details']);
    Route::get('items', ['uses' => 'InvoiceController@items']);
    Route::post('export', ['uses' => 'InvoiceController@export']);
});

Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:shipping', 'localization'], 'prefix' => 'goods/shipping'], function () {
    Route::post('create', ['uses' => 'ShippingController@post']);
    Route::post('get', ['uses' => 'ShippingController@get']);
    Route::get('details', ['uses' => 'ShippingController@details']);
    Route::post('update', ['uses' => 'ShippingController@update']);
    Route::post('export', ['uses' => 'ShippingController@export']);
    Route::post('format', ['uses' => 'ShippingController@format']);
});

Route::group(['namespace' => 'API\Goods\Shipping', 'middleware' => ['auth:api', 'scopes:shipping', 'localization'], 'prefix' => 'goods/shipping/alteration'], function () {
    Route::post('get', ['uses' => 'AlterationController@get']);
    Route::post('export', ['uses' => 'ShippingAlterationController@export']);
});

Route::group(['namespace' => 'API\Goods\Shipping', 'middleware' => ['auth:api', 'scopes:shipping', 'localization'], 'prefix' => 'goods/shipping/available/shipping/item'], function () {
    Route::post('get', ['uses' => 'AvailableShippingItemController@get']);
});

Route::group(['namespace' => 'API\Goods\Shipping', 'middleware' => ['auth:api', 'scopes:shipping', 'localization'], 'prefix' => 'goods/shipping/packing'], function () {
    Route::post('export', ['uses' => 'PackingController@export']);
});

Route::group(['namespace' => 'API\Goods\Shipping', 'middleware' => ['auth:api', 'scopes:shipping', 'localization'], 'prefix' => 'goods/shipping/mailer'], function () {
    Route::post('export', ['uses' => 'MailerController@export']);
});

Route::group(['namespace' => 'API\Goods\Shipping', 'middleware' => ['auth:api', 'scopes:shipping', 'localization'], 'prefix' => 'goods/shipping/invoice'], function () {
    Route::post('export', ['uses' => 'InvoiceController@export']);
});

Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:goods', 'localization'], 'prefix' => 'goods/item'], function () {
    Route::post('update', ['uses' => 'ItemController@update']);
    Route::post('get', ['uses' => 'ItemController@get']);
    Route::get('details', ['uses' => 'ItemController@details']);
    Route::post('delete', ['uses' => 'ItemController@delete']);
    Route::post('export', ['uses' => 'ItemController@export']);
});

Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:goods', 'localization'], 'prefix' => 'goods/content'], function () {
    Route::post('update', ['uses' => 'ContentController@update']);
    Route::post('get', ['uses' => 'ContentController@get']);
    Route::get('details', ['uses' => 'ContentController@details']);
    Route::post('delete', ['uses' => 'ContentController@delete']);
    Route::post('export', ['uses' => 'ContentController@export']);
});

Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:warehouse', 'localization'], 'prefix' => 'goods/warehouse'], function () {
    Route::post('create', ['uses' => 'WarehouseController@post']);
    Route::post('update', ['uses' => 'WarehouseController@update']);
    Route::post('get', ['uses' => 'WarehouseController@get']);
    Route::get('details', ['uses' => 'WarehouseController@details']);
    Route::post('delete', ['uses' => 'WarehouseController@delete']);
    Route::post('export', ['uses' => 'WarehouseController@export']);
});

Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:stock', 'localization'], 'prefix' => 'goods/stock'], function () {
    Route::post('get', ['uses' => 'StockController@get']);
    Route::post('export', ['uses' => 'StockController@export']);
    Route::post('calendar/get', ['uses' => 'StockCalendarController@get']);
});

Route::group(['namespace' => 'API\Goods', 'middleware' => ['auth:api', 'scopes:goods', 'localization'], 'prefix' => 'goods/barcode'], function () {
    Route::post('get', ['uses' => 'BarcodeController@get']);
});

Route::group(['namespace' => 'API\Statistics\Chart', 'middleware' => ['auth:api', 'localization'], 'prefix' => 'statistics/chart'], function () {
    Route::get('purchaseline/get', ['uses' => 'PurchaseLineController@get']);
});

Route::group(['namespace' => 'API\Statistics\Dashboard', 'middleware' => ['auth:api', 'localization'], 'prefix' => 'statistics/dashboard'], function () {
    Route::get('callout/get', ['uses' => 'CalloutController@get']);
});

Route::group(['namespace' => 'API', 'middleware' => ['auth:api', 'localization'], 'prefix' => 'exchangerate'], function () {
    Route::post('update', ['uses' => 'ExchangeRateController@update']);
    Route::post('get', ['uses' => 'ExchangeRateController@get']);
    Route::post('details', ['uses' => 'ExchangeRateController@details']);
});