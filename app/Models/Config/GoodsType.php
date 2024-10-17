<?php

namespace App\Models\Config;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class GoodsType extends Model
{
    //
    use HasUuids;

    protected $table = 'config_goods_types';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'value',
    ];
}
