<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExchangeRates extends Model
{
    //

    protected $table = 'exchange_rates';

    protected $guarded = [];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'base',
        'symbol',
        'rate',
    ];

}
