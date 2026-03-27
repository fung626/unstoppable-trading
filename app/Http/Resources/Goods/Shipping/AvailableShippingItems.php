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
        $sizes = config('constant.goods.sizes');

        // Batch-load all items for every goods_id in this page — avoids N×sizes queries
        $goodsIds = $this->collection->pluck('goods_id')->unique()->values()->toArray();
        $allItems = Item::whereIn('goods_id', $goodsIds)->get();

        // Batch-load all stock sums in one query
        $allItemIds = $allItems->pluck('id')->toArray();
        $stockSumMap = [];
        if (!empty($allItemIds)) {
            Stock::whereIn('goods_item_id', $allItemIds)
                ->selectRaw('goods_item_id, COALESCE(SUM(unit), 0) as unit')
                ->groupBy('goods_item_id')
                ->get()
                ->each(function ($row) use (&$stockSumMap) {
                    $stockSumMap[$row->goods_item_id] = $row->unit * 1;
                });
        }

        return $this->collection->transform(function ($item) use ($sizes, $allItems, $stockSumMap) {
            $item->total_unit = 0;
            foreach ($sizes as $size) {
                $_item = $allItems->first(function ($i) use ($item, $size) {
                    return $i->goods_id === $item->goods_id
                        && $i->size === $size
                        && (!$item->color || $i->color === $item->color)
                        && (!$item->cup || $i->cup === $item->cup);
                });

                if ($_item) {
                    $stockUnit = $stockSumMap[$_item->id] ?? 0;
                    $item->total_unit += $stockUnit;
                    $item->{$size} = [
                        'goods_item_id' => $_item->id,
                        'barcode' => $_item->barcode,
                        'unit' => 0,
                        'stock_unit' => $stockUnit,
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