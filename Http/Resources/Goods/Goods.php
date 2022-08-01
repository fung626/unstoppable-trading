<?php

namespace App\Http\Resources\Goods;

use App\Models\Goods\Stock\Stock;
// use App\Models\Goods\Stock\StockTake;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Str;

class Goods extends ResourceCollection
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
            $stockSum = Stock::goodsSum($item->id);
            $item->stock_unit = $stockSum ? $stockSum->unit * 1 : 0;
            $item->actions = [
                [
                    'key' => Str::random(16),
                    'title' => __('New Purchase'),
                    'color' => "info",
                    'type' => "RouterPush",
                    'route' => "CreatePurchase",
                    'disabled' => false,
                ],
                [
                    'key' => Str::random(16),
                    'title' => __('Details'),
                    'color' => "primary",
                    'type' => "RouterPush",
                    'route' => "GoodsDetails",
                    'disabled' => false,
                ],
                [
                    'key' => Str::random(16),
                    'title' => __('Delete'),
                    'color' => "danger",
                    'type' => "Delete",
                    'disabled' => $item->stock_unit > 0 ? true : false,
                ],
            ];
            return $item;
        });
    }
}