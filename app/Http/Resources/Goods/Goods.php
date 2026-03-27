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

        // Batch-load all stock sums in one query to avoid N+1 over remote DB
        $goodsIds = $this->collection->pluck('id')->toArray();
        $stockSumMap = [];
        if (!empty($goodsIds)) {
            Stock::whereIn('goods_id', $goodsIds)
                ->selectRaw('goods_id, COALESCE(SUM(unit), 0) as unit')
                ->groupBy('goods_id')
                ->get()
                ->each(function ($row) use (&$stockSumMap) {
                    $stockSumMap[$row->goods_id] = $row->unit * 1;
                });
        }

        return $this->collection->transform(function ($item) use ($stockSumMap) {
            $item->stock_unit = $stockSumMap[$item->id] ?? 0;
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