<?php

namespace App\Models\Client;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class MonthlySettlement extends Model
{

    use HasUuids;
    //
    protected $table = 'client_monthly_settlements';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'client_id',
        'client_number',
        'goods_shipping_ids',
        'settled',
        'month',
        'year',
    ];

    protected $casts = [
        'goods_shipping_ids' => 'json',
    ];
}
