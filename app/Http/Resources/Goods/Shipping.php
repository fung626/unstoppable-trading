<?php

namespace App\Http\Resources\Goods;

use App\Models\Config\CountryCode;
use App\Mylibs\Common;
use App\Mylibs\Goods as GoodsLib;
use Illuminate\Http\Resources\Json\JsonResource;

class Shipping extends JsonResource
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
        if (isset($this->client_phone_country_code) && isset($this->client_phone)) {
            $countryCodeConfigs = CountryCode::get()->toArray();
            $index = array_search($this->client_phone_country_code, array_column($countryCodeConfigs, 'code'));
            $iso = $countryCodeConfigs[$index]['iso'];
            if ($iso && $this->client_phone_country_code) {
                $this->formated_phone = Common::formatPhoneNumber($this->client_phone, $iso);
            }
        } else if (isset($this->client_phone)) {
            $this->formated_phone = $this->client_phone;
        } else {
            $this->formated_phone = null;
        }

        $totalunit = 0;
        $subtotal = 0;
        $shippingStocks = $this->shippingStocks;
        if (is_array($shippingStocks) || is_object($shippingStocks)) {
            foreach ($shippingStocks as $shipStock) {
                if (isset($shipStock->stock->unit)) {
                    $totalunit += $shipStock->stock->unit;
                    $subtotal += abs($shipStock->stock->unit) * $shipStock->stock->goods->wholesale_price;
                }
            }
        }

        return [
            'id' => $this->id,
            'client_id' => $this->client_id,
            'client_name' => $this->client_name,
            'client_phone_country_code' => $this->client_phone_country_code,
            'client_phone' => $this->client_phone,
            'client_email' => $this->client_email,
            'client_address' => $this->client_address,
            'status' => $this->status,
            'total_unit' => abs($totalunit),
            'subtotal' => Common::formatPrice(abs($subtotal)),
            'ship_stocks' => $this->shippingStocks,
            'header_items' => GoodsLib::formatShippingInvoiceHeaderItems($this),
            'ship_items' => GoodsLib::formatShippingInvoiceItems($this),
            'footer_items' => GoodsLib::formatShippingInvoiceFooterItems(abs($totalunit), $subtotal, $this->currency),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
