<?php

namespace App\Models\Goods;

use App\Models\Goods\Stock\StockShipping;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shipping extends Model
{
    //
    use HasUuids, SoftDeletes;

    protected $table = 'goods_shippings';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    protected $fillable = [
        'number',
        'client_id',
        'client_number',
        'client_contact',
        'client_name',
        'client_phone_country_code',
        'client_phone',
        'client_email',
        'client_address',
        'currency',
        'status',
        'delivered_at',
        'delivered_status',
    ];

    protected $appends = [
        'generated_id',
    ];

    public function getGeneratedIdAttribute()
    {
        return $this->client_number . '-' . sprintf('%08d', $this->number);
    }

    public static function getNumber($client_id)
    {
        $count = self::where(['client_id' => $client_id])->count();
        return $count + 1;
    }

    public function shippingStocks()
    {
        return $this->hasMany(StockShipping::class, 'goods_shipping_id');
    }

}
