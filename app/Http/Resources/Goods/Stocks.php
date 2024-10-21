<?php

namespace App\Http\Resources\Goods;

use App\Models\Goods\Item;
use App\Models\Goods\Stock\Stock;
use Illuminate\Http\Resources\Json\ResourceCollection;
// use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class Stocks extends ResourceCollection
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
            // Log::debug($item);

            $sizes = config('constant.goods.sizes');
            $item->total_unit = 0;
            $item->subtotal = 0;
            foreach ($sizes as $size) {
                $_item = Item::where(['goods_id' => $item->goods_id, 'size' => $size])
                    ->when($item->color, function ($query) use ($item) {
                        return $query->where('color', $item->color);
                    })
                    ->when($item->cup, function ($query) use ($item) {
                        return $query->where('cup', $item->cup);
                    })
                    ->when($item->cost_price, function ($query) use ($item) {
                        return $query->where('cost_price', $item->cost_price);
                    })
                    ->first();

                if ($_item) {
                    $stock = Stock::goodsItemSum($_item->id);
                    if ($stock) {
                        $item->total_unit += $stock->unit;
                    }
                    $stock_unit = $stock ? $stock->unit * 1 : 0;
                    $cost_price = isset($_item->cost_price) ? $_item->cost_price : $item->goods->cost_price;
                    $stock_subtotal = $cost_price * $stock_unit;
                    $item->subtotal += $stock_subtotal;
                    $item->{$size} = [
                        'goods_item_id' => $_item->id,
                        'barcode' => $_item->barcode,
                        'unit' => 0,
                        'cost_price' => isset($_item->cost_price) ? $_item->cost_price : null,
                        'retail_price' => isset($_item->retail_price) ? $_item->retail_price : null,
                        'wholesale_price' => isset($_item->wholesale_price) ? $_item->wholesale_price : null,
                        'stock_unit' => $stock_unit,
                        'stock_subtotal' => $stock_subtotal,
                    ];
                }
            }
            $item->actions = [
                [
                    'key' => Str::random(16),
                    'title' => __('Add Shipping List'),
                    'color' => "info",
                    'type' => "Dialog",
                    'disabled' => false,
                ],
                [
                    'key' => Str::random(16),
                    'title' => __('New Purchase'),
                    'color' => "info",
                    'type' => "RouterPush",
                    'route' => "/purchases/create/" . $item->goods->supplier->id,
                    'disabled' => false,
                ],
                [
                    'key' => Str::random(16),
                    'title' => __('Details'),
                    'color' => "primary",
                    'type' => "RouterPush",
                    'route' => "/goods/details/" . $item->goods->id,
                    'disabled' => false,
                ],
            ];
            return $item;
        });
    }
}
