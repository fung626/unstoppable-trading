<?php

namespace App\Http\Resources\Goods;

use App\Models\Goods\Stock\Stock;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

// use Illuminate\Support\Facades\Log;

class Item extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        // Log::debug($this);
        $stockSum = Stock::goodsItemSum($this->id);
        $stockUnit = $stockSum ? $stockSum->unit * 1 : 0;
        return [
            'id' => $this->id,
            'goods_id' => $this->goods_id,
            'goods' => $this->goods,
            'size' => $this->size,
            'color' => $this->color,
            'cup' => $this->cup,
            'barcode' => $this->barcode,
            // 'stock_taken_unit' => StockTake::where('goods_item_id', $this->id)->get()->sum('unit'),
            'stock_unit' => $stockUnit,
            'created_by' => $this->created_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'actions' => [
                [
                    'key' => Str::random(16),
                    'title' => __('Add Shipping List'),
                    'color' => "info",
                    'type' => "AddShipping",
                    'route' => "CreatePurchase",
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
                    'disabled' => $stockUnit > 0 ? true : false,
                ],
            ],
        ];
    }
}