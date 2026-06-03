<?php

namespace App\Models\Goods\Purchase;

use App\Models\Goods\Goods;
use App\Models\Goods\Item as GoodsItem;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    //
    use Uuid, SoftDeletes;

    protected $table = 'goods_purchase_items';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    protected $fillable = [
        'goods_purchase_id',
        'goods_item_id',
        'goods_id',
        'unit',
        'unit_price',
        'cost',
    ];

    public function goods()
    {
        return $this->hasOne(Goods::class, 'id', 'goods_id');
    }

    public function goodsItem()
    {
        return $this->hasOne(GoodsItem::class, 'id', 'goods_item_id');
    }

}