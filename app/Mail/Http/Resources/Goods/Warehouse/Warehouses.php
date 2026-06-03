<?php

namespace App\Http\Resources\Goods\Warehouse;

use App\Models\Goods\Stock\Stock;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class Warehouses extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return $this->collection->transform(function ($item) use ($request) {
            $stock_unit = 0;
            Log::debug($item->goods);
            foreach ($item->goods as $goods) {
                $stock = Stock::goodsSum($goods->id);
                if ($stock) {
                    $stock_unit += $stock->unit;
                }
            }
            $item->name = $item->name;
            $item->stock_unit = $stock_unit;
            $item->actions = [
                [
                    'key' => Str::random(16),
                    'title' => __('Details'),
                    'color' => "primary",
                    'type' => "RouterPush",
                    'disabled' => false,
                ],
                [
                    'key' => Str::random(16),
                    'title' => __('Delete'),
                    'color' => "danger",
                    'type' => "Delete",
                    'disabled' => $stock_unit > 0 ? true : false,
                ],
            ];
            return $item;
        });
    }
}