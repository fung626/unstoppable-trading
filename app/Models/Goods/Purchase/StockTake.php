<?php

namespace App\Models\Goods\Purchase;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Stocktake extends Model
{
    //

    use HasUuids;

    protected $table = 'goods_stocktakes';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    protected $fillable = [
        'goods_purchase_id',
        'goods_purchase_item_id',
        'goods_id',
        'goods_item_id',
        'unit',
    ];
}
