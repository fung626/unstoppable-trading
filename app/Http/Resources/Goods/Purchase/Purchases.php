<?php

namespace App\Http\Resources\Goods\Purchase;

use App\Mylibs\Common;
use Illuminate\Http\Resources\Json\ResourceCollection;
// use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class Purchases extends ResourceCollection
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
            $subtotal = 0;
            $totalunit = 0;
            $items = [];
            foreach ($item->items as $_item) {
                $totalunit += $_item->unit;
                $subtotal += $_item->unit * $_item->unit_price;
                $_item->_unit = $_item->unit;
                $items[] = $_item;
            }
            return [
                "id" => $item->id,
                "user_id" => $item->user_id,
                "supplier_id" => $item->supplier_id,
                "generated_id" => $item->generated_id,
                "currency" => $item->currency,
                "from_company" => $item->from_company,
                "from_email" => $item->from_email,
                "to_address" => $item->to_address,
                "to_company" => $item->to_company,
                "to_email" => $item->to_email,
                "to_phone" => $item->to_phone,
                "status" => $item->status,
                "subtotal" => Common::formatPrice($subtotal),
                "totalunit" => $totalunit,
                "date" => $item->date,
                "items" => $items,
                "supplier" => $item->supplier,
                "users" => $item->users,
                "updated_at" => $item->updated_at,
                "created_at" => $item->created_at,
                "status_actions" => [
                    [
                        'key' => Str::random(16),
                        'title' => __('Processing'),
                        'color' => "info",
                        'type' => "UpdateStatus",
                        'status' => "PROCESSING",
                        'disabled' => $item->status === 'PROCESSING' || $item->status === 'DELIVERED' ? true : false,
                    ],
                    [
                        'key' => Str::random(16),
                        'title' => __('Delivered'),
                        'color' => "success",
                        'type' => "UpdateStatus",
                        'status' => "DELIVERED",
                        'disabled' => $item->status === 'DELIVERED' ? true : false,
                    ],
                ],
                "actions" => [
                    [
                        'key' => Str::random(16),
                        'title' => __('Stocktake'),
                        'color' => "info",
                        'type' => "RouterPush",
                        'route' => "/purchases/stocktakes/" . $item->id,
                        'disabled' => $item->status === 'PROCESSING' || $item->status === 'DELIVERED' ? true : false,
                    ],
                    [
                        'key' => Str::random(16),
                        'title' => __('Details'),
                        'color' => "primary",
                        'type' => "RouterPush",
                        'route' => "/purchases/details/" . $item->id,
                        'disabled' => false,
                    ],
                    // [
                    //     'key' => Str::random(16),
                    //     'title' => __('Delete'),
                    //     'color' => "danger",
                    //     'type' => "Delete",
                    //     'disabled' => $item->status === 'PROCESSING' || $item->status === 'DELIVERED' ? true : false,
                    // ],
                ],
            ];
        });
    }
}
