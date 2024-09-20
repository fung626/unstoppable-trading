<?php

namespace App\Http\Resources\Goods;

use App\Models\Config\CountryCode;
use App\Mylibs\Common;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Str;

class Shippings extends ResourceCollection
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
        $countryCodeConfigs = CountryCode::get()->toArray();
        return $this->collection->transform(function ($item) use ($request, $countryCodeConfigs) {
            // $item->unit = abs($item->unit);
            $index = array_search($item->client_phone_country_code, array_column($countryCodeConfigs, 'code'));
            $iso = $countryCodeConfigs[$index]['iso'];
            if ($iso && $item->client_phone_country_code) {
                $item->formated_phone = Common::formatPhoneNumber($item->client_phone, $iso);
            }

            $totalunit = 0;
            $subtotal = 0;
            $shippingStocks = $item->shippingStocks;
            if (is_array($shippingStocks) || is_object($shippingStocks)) {
                foreach ($shippingStocks as $shipStock) {
                    if (isset($shipStock->stock->unit)) {
                        $totalunit += $shipStock->stock->unit;
                        $subtotal += abs($shipStock->stock->unit) * $shipStock->stock->goods->wholesale_price;
                    }
                }
            }
            $item->generated_id = $item->generated_id;
            $item->total_unit = abs($totalunit);
            $item->subtotal = Common::formatPrice(abs($subtotal));
            $item->status_actions = [
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
            ];
            $item->actions = [
                [
                    'key' => Str::random(16),
                    'title' => __('Details'),
                    'color' => "primary",
                    'type' => "RouterPush",
                    'route' => "/shippings/details/" . $item->id,
                    'disabled' => false,
                ],
            ];
            return $item;
        });
    }
}
