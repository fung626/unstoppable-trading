<?php

namespace App\Models\Goods\Stock;

use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use App\Models\Goods\Stock\StockShipping;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Stock extends Model
{
    //
    use HasUuids;

    protected $table = 'goods_stocks';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'goods_id',
        'goods_item_id',
        'unit',
        'unit_price',
        'cost_price',
        'type',
    ];

    protected $appends = [
        'gross_profit',
    ];

    public static function goodsSum($id)
    {
        return self::where(['goods_id' => $id])
            ->select(['goods_id', DB::raw('COALESCE(SUM(unit), 0) as unit')])
            ->groupBy('goods_id')
            ->first();
    }

    public static function goodsItemSum($id)
    {
        return self::where(['goods_item_id' => $id])
            ->select(['goods_item_id', DB::raw('COALESCE(SUM(unit), 0) as unit')])
            ->groupBy('goods_item_id')
            ->first();
    }

    public function goods()
    {
        return $this->belongsTo(Goods::class, 'goods_id');
    }

    public function goodsItem()
    {
        return $this->belongsTo(Item::class, 'goods_item_id');
    }

    public function stocktake()
    {
        return $this->hasOne(Content::class, 'goods_stock_id');
    }

    public function stockShip()
    {
        return $this->hasOne(StockShipping::class, 'goods_stock_id');
    }

    public function getGrossProfitAttribute()
    {
        return $this->unit_price * abs($this->unit) - $this->cost_price * abs($this->unit);
    }

}
