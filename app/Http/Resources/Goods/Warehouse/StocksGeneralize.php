<?php

namespace App\Http\Resources\Goods\Warehouse;

use Illuminate\Http\Resources\Json\ResourceCollection;

class StocksGeneralize extends ResourceCollection
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
            return [
                'warehouse_id' => $item->warehouse_id,
                'goods_id' => $item->goods_id,
                'goods_name' => $item->goods_name,
                'goods_image' => $item->goods_image,
                'goods_price' => $item->goods_price,
                'goods_contents' => json_decode($item->goods_contents),
                'warehouse_address' => $item->warehouse_address,
                'warehouse_stock_quantity' => $item->warehouse_stock_quantity * 1,
            ];
        });
    }
}