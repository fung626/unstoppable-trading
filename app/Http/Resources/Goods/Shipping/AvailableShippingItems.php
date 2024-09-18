<?php

namespace App\Http\Resources\Goods\Shipping;

use App\Models\Goods\Item;
use App\Models\Goods\Stock\Stock;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Str;

class AvailableShippingItems extends ResourceCollection
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
            $sizes = config('constant.goods.sizes');
            $item->total_unit = 0;
            foreach ($sizes as $size) {
                $_item = Item::where(['goods_id' => $item->goods_id, 'size' => $size])
                    ->when($item->color, function ($query) use ($item) {
                        return $query->where('color', $item->color);
                    })
                    ->when($item->cup, function ($query) use ($item) {
                        return $query->where('cup', $item->cup);
                    })
                    ->first();

                if ($_item) {
                    $stock = Stock::goodsItemSum($_item->id);
                    if ($stock) {
                        $item->total_unit += $stock->unit;
                    }
                    $item->{$size} = [
                        'goods_item_id' => $_item->id,
                        'barcode' => $_item->barcode,
                        'unit' => 0,
                        'stock_unit' => $stock ? $stock->unit * 1 : 0,
                    ];
                }
            }
            $item->actions = [
                [
                    'key' => Str::random(16),
                    'title' => __('Add'),
                    'color' => "info",
                    'type' => "Dialog",
                    'disabled' => false,
                ],
            ];
            return $item;
        });
    }
}
