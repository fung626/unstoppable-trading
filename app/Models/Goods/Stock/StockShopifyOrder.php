<?php
namespace App\Models\Goods\Stock;

// use App\Models\Goods\Shipping;
use App\Models\Goods\Stock\Stock;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;

class StockShopifyOrder extends Model
{
    //
    use Uuid;

    protected $table = 'goods_stock_shopify_orders';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    protected $fillable = [
        'goods_stock_id',
        'shopify_order_id',
    ];

    public function stock()
    {
        return $this->hasOne(Stock::class, 'id', 'goods_stock_id');
    }

}