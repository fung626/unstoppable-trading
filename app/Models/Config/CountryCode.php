<?php

namespace App\Models\Config;

use Illuminate\Database\Eloquent\Model;

class CountryCode extends Model
{
    //

    protected $table = 'config_country_codes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'iso',
        'country',
        'code',
    ];
}
