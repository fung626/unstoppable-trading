<?php

namespace App\Http\Resources\Goods;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Str;

class Contents extends ResourceCollection
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
            $item->actions = [
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
            ];
            return $item;
        });
    }
}