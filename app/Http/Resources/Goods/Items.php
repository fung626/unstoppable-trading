<?php

namespace App\Http\Resources\Goods;

use App\Models\Goods\Stock\Stock;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Str;

class Items extends ResourceCollection
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
            $stockSum = Stock::goodsItemSum($item->id);
            // $item->stock_taken_unit = Stocktake::where('goods_item_id', $item->id)->get()->sum('unit');
            $item->stock_unit = $stockSum ? $stockSum->unit * 1 : 0;
            $item->actions = [
                [
                    'key' => Str::random(16),
                    'title' => __('Add Shipping List'),
                    'color' => "info",
                    'type' => "AddShipping",
                    // 'route' => "purchases/create/" . $this->id,
                    'disabled' => false,
                ],
                [
                    'key' => Str::random(16),
                    'title' => __('Update'),
                    'color' => "primary",
                    'type' => "Update",
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
