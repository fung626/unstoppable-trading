<?php
namespace App\Models\Goods;

use App\Models\Goods\Goods;
use App\Models\Goods\Stock\Stock;
use App\Models\User\Users;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Item extends Model
{
    //
    use Uuid;

    // use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

    protected $table = 'goods_items';

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
        'shopify_variant_id',
        'shopify_inventory_item_id',
        'size',
        'cup',
        'color',
        'barcode',
        'created_by',
        'last_shopify_push_at',
    ];

    public function goods()
    {
        return $this->belongsTo(Goods::class)->withDefault();
    }

    public function creator()
    {
        return $this->hasOne(Users::class, 'id', 'created_by');
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class, 'goods_item_id');
    }

    public static function withSizes($goods_id = false, $goods_item_id = false)
    {
        $sizes = config('constant.goods.sizes');
        $select = [
            // 'id',
            'goods_id',
            'color',
            'cup',
        ];
        $index = count($select);
        foreach ($sizes as $size) {
            $select[$index] = DB::raw('null as ' . '"' . $size . '"');
            $index++;
        }
        return self::with(['goods'])
            ->select($select)
            ->when($goods_id, function ($query) use ($goods_id) {
                return $query->where('goods_id', $goods_id);
            })
            ->when($goods_item_id, function ($query) use ($goods_item_id) {
                return $query->where('id', $goods_item_id);
            })
            ->groupBy(['goods_id', 'color', 'cup']);
    }

}