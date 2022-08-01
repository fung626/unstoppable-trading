<?php

namespace App\Models\Goods\Invoice;

use App\Models\Goods\Goods;
use App\Models\Goods\Invoice\Invoice;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{

    use Uuid;

    protected $table = 'invoice_item';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'invoice_id',
        'goods_id',
        'price',
        'quantity',
        'type',
    ];

    //
    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'invoice_id');
    }

    public function goods()
    {
        return $this->belongsTo(Goods::class, 'goods_id');
    }

}