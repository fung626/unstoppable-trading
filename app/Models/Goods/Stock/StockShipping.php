<?php

namespace App\Models\Goods\Stock;

// use App\Models\Goods\Shipping;
use App\Models\Goods\Stock\Stock;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class StockShipping extends Model
{
    //
    use HasUuids;

    protected $table = 'goods_stock_shippings';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    protected $fillable = [
        'goods_shipping_id',
        'goods_shipping_stock_id',
    ];

    public function stock()
    {
        return $this->hasOne(Stock::class, 'id', 'goods_shipping_stock_id');
    }

}
