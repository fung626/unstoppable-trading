<?php

namespace App\Http\Resources\Client;

use App\Models\Config\CountryCode;
use App\Mylibs\Common;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class Clients extends ResourceCollection
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
        $countryCodeConfigs = CountryCode::get()->toArray();
        return $this->collection->transform(function ($item) use ($request, $countryCodeConfigs) {
            try {
                // dd($countryCodeConfigs);
                $index = array_search($item->phone_country_code, array_column($countryCodeConfigs, 'code'));
                $iso = $countryCodeConfigs[$index]['iso'];
                if ($iso && $item->phone_country_code) {
                    $item->formated_phone = Common::formatPhoneNumber($item->phone, $iso);
                }
            } catch (\Exception $e) {
                // dd($e->getMessage());
                Log::error($e->getMessage());
                $response['msg'] = $e->getMessage();
                // return response()->json($response, 200);
            }
            $item->actions = [
                [
                    'key' => Str::random(16),
                    'title' => __('Details'),
                    'color' => "primary",
                    'type' => "RouterPush",
                    'route' => "ClientDetails",
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
