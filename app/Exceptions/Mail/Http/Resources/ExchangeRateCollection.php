<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ExchangeRateCollection extends ResourceCollection
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
                'id' => $item->id,
                'base' => $item->base,
                'symbol' => $item->symbol,
                'rate' => $item->rate,
                'updated_at' => $item->updated_at,
                'created_at' => $item->created_at,
                'actions' => [
                    [
                        'key' => 1,
                        'title' => __("Details"),
                        'color' => "primary",
                        'type' => "RouterPush",
                        'route' => "UserDetails",
                        'disabled' => false,
                    ],
                ],
            ];
        });
    }
}