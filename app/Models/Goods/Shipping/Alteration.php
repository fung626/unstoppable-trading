<?php

namespace App\Models\Goods\Shipping;

use App\Models\Goods\Item;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Alteration extends Model
{
    //
    use HasUuids;

    protected $table = 'goods_shipping_alterations';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'goods_item_id',
        'goods_shipping_id',
        'goods_stock_id',
        'unit',
        'altered_unit',
        'type',
    ];

    public function item()
    {
        return $this->hasOne(Item::class, 'id', 'goods_item_id');
    }
}
