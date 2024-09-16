<?php

namespace App\Http\Resources\Goods;

use App\Models\Config\CountryCode;
use App\Mylibs\Common;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class Suppliers extends ResourceCollection
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
        // Log::debug($request->goods);
        $countryCodeConfigs = CountryCode::get()->toArray();
        return $this->collection->transform(function ($item) use ($request, $countryCodeConfigs) {
            $index = array_search($item->phone_country_code, array_column($countryCodeConfigs, 'code'));
            $iso = $countryCodeConfigs[$index]['iso'];
            if ($iso && $item->phone_country_code && is_numeric($iso) && is_numeric($item->phone_country_code)) {
                try {
                    $item->formated_phone = Common::formatPhoneNumber($item->phone, $iso);
                } catch (ProcessFailedException $exception) {
                    Log::error($exception->getMessage());
                }
            }
            // $countryCode = CountryCode::where(['code' => $item->fax_country_code])->first();
            $index = array_search($item->fax_country_code, array_column($countryCodeConfigs, 'code'));
            $iso = $countryCodeConfigs[$index]['iso'];
            if ($iso && $item->fax && is_numeric($iso) && is_numeric($item->fax)) {
                try {
                    $item->formated_fax = Common::formatPhoneNumber($item->fax, $iso);
                } catch (ProcessFailedException $exception) {
                    Log::error($exception->getMessage());
                }
            }
            $item->actions = [
                [
                    'key' => Str::random(16),
                    'title' => __("Details"),
                    'color' => "primary",
                    'type' => "RouterPush",
                    'route' => "SupplierDetails",
                    'disabled' => false,
                ],
                [
                    'key' => Str::random(16),
                    'title' => __("Delete"),
                    'color' => "danger",
                    'type' => "Delete",
                    'disabled' => false,
                ],
            ];
            return $item;
        });
    }
}
