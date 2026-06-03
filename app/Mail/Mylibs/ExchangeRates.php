<?php

use App\Models\ExchangeRates as ExchangeRatesModels;

class ExchangeRates
{

    public static function rate($base = 'HKD', $symbol = 'TWD')
    {
        $result = ExchangeRatesModels::where([
            'base' => $base,
            'symbol' => $symbol,
        ])->first();
        if ($rate) {
            return $result->rate;
        }
        return false;
    }

}
