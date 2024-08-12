<?php

namespace App\Models\Goods\Stock;

use App\Models\Goods\Warehouse\Warehouse;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class StockTake extends Model
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
    ];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'goods_stock_id');
    }
}
