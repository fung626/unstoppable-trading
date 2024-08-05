<?php

namespace App\Models\Goods\Warehouse;

use App\Models\Goods\Stock\Stock as MasterStock;
use App\Models\Goods\Trade as MasterTrade;
use App\Models\Goods\Warehouse\Warehouse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Stock extends Model
{
    //
    use HasUuids;

    protected $table = 'warehouse_stocks';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'warehouse_id',
        'trade_id',
        'stock_id',
        'quantity',
        'type',
        'description',
    ];

    public static function generalize()
    {
        return self::join('stock', 'warehouse_stock.stock_id', 'stock.id')
            ->join('warehouse', 'warehouse_stock.warehouse_id', 'warehouse.id')
            ->join('goods', 'stock.goods_id', 'goods.id')
            ->select([
                'warehouse_stock.warehouse_id',
                'stock.goods_id',
                'warehouse.address as warehouse_address',
                'goods.name as goods_name',
                'goods.image as goods_image',
                'goods.price as goods_price',
                'goods.contents as goods_contents',
                DB::raw('sum(warehouse_stock.quantity) as warehouse_stock_quantity'),
            ])
            ->groupBy('warehouse_stock.warehouse_id')
            ->groupBy('stock.goods_id')
            ->get();
    }

    public static function available($warehouse_id = false, $goods_id = false)
    {
        if ($warehouse_id && $goods_id) {
            $result = self::whereHas('masterStock', function ($q) use ($goods_id) {
                $q->where('goods_id', $goods_id);
            })->where(['warehouse_id' => $warehouse_id])
                ->sum('quantity');
            return $result;
        }
        return false;
    }

    public function warehouse()
    {
        return $this->hasOne(Warehouse::class, 'id', 'warehouse_id');
    }

    public function masterTrade()
    {
        return $this->belongsTo(MasterTrade::class, 'trade_id');
    }

    public function masterStock()
    {
        return $this->belongsTo(MasterStock::class, 'stock_id');
    }
}
