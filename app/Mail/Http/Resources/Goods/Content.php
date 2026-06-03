<?php

namespace App\Http\Resources\Goods;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class Content extends JsonResource
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
        return [
            'id' => $this->id,
            'goods_id' => $this->goods_id,
            'key' => $this->key,
            'value' => $this->value,
            'created_by' => $this->created_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'actions' => [
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
                    'disabled' => false,
                ],
            ],
        ];
    }
}