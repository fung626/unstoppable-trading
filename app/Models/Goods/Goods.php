<?php

namespace App\Models\Goods;

use App\Models\Goods\Category;
use App\Models\Goods\Content;
use App\Models\Goods\Item;
use App\Models\Goods\Supplier;
use App\Models\Goods\Warehouse\Warehouse;
use App\Models\User\Users;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

// use Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

class Goods extends Model
{
    //
    use Uuid, SoftDeletes;

    use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

    protected $table = 'goods';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'number',
        'name',
        'code',
        'cost_price',
        'wholesale_price',
        'retail_price',
        'image',
        'supplier_id',
        'type',
        'price',
        'stock_alert',
        'categories',
        'warehouses',
        'contents',
        'description',
        'created_by',
    ];

    protected $casts = [
        'categories' => 'array',
        'warehouses' => 'array',
        'contents' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();
        Goods::updating(function ($model) {
            Log::debug('updating');
        });
    }

    public function creator()
    {
        return $this->hasOne(Users::class, 'id', 'created_by');
    }

    public function supplier()
    {
        return $this->hasOne(Supplier::class, 'id', 'supplier_id');
    }

    public function categories()
    {
        return $this->belongsToJson(Category::class, 'categories');
    }

    public function warehouses()
    {
        return $this->belongsToJson(Warehouse::class, 'warehouses');
    }

    public function items()
    {
        return $this->hasMany(Item::class, 'goods_id');
    }

    public function contents()
    {
        return $this->hasMany(Content::class, 'goods_id');
    }

}