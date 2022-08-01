<?php // Code within app\Helpers\Helper.php

namespace App\Mylibs;

use App\Models\Goods\Stock\Stock;
use App\Models\Goods\Trade;
use App\Models\Goods\Warehouse\Stock as WarehouseStockModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class WarehouseStock
{

    public static $types = [
        'NEW', // in
        'EXCHANGE', // in
        'RETURN', // in
        'SHIPPED', // out
        'DEFECTIVE', // out
    ];

    public static function create($data)
    {
        try {
            DB::transaction(function () use ($data) {
                // dd($data);
                switch ($data->type) {
                    case 'NEW': // create with stock if it s new/return/exchange goods
                    case 'EXCHANGE':
                    case 'RETURN':
                        $stock = Stock::create([
                            'goods_id' => $data->goods_id,
                        ]);

                        WarehouseStockModel::create([
                            'stock_id' => $stock->id,
                            'warehouse_id' => $data->warehouse_id,
                            'quantity' => $data->quantity,
                            'type' => $data->type,
                            'description' => empty($data->description) ? null : $data->description,
                        ]);
                        break;
                    case 'SHIPPED': // create with trade if it s shipped/defective goods
                    case 'DEFECTIVE':

                        $quantity = $data->quantity > 0 ? 0 - $data->quantity : $data->quantity;

                        $trade = Trade::create([
                            'goods_id' => $data->goods_id,
                            'invoice_item_id' => $data->invoice_item_id,
                        ]);

                        WarehouseStockModel::create([
                            'trade_id' => $trade->id,
                            'warehouse_id' => $data->warehouse_id,
                            'quantity' => $quantity,
                            'type' => $data->type,
                            'description' => empty($data->description) ? null : $data->description,
                        ]);
                        break;
                    default:
                        $result = new \stdClass();
                        $response = config('response.common.fail.parameter');
                        $result->response = $response;
                        $result->code = 400;
                        return $result;
                        break;
                }

            });
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $result = new \stdClass();
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            $result->response = $response;
            $result->code = 400;
            return $result;
        }

        return true;
    }

}