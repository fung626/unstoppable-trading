<?php

namespace App\Models\Goods;

use App\Models\Goods\Goods;
use App\Models\Goods\Invoice\Item as InvoiceItem;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    //
    use Uuid;

    protected $table = 'trade';

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
        'invoice_item_id',
    ];

    public function goods()
    {
        return $this->belongsTo(Goods::class, 'goods_id');
    }

    public function invoiceItem()
    {
        return $this->hasMany(InvoiceItem::class, 'invoice_item_id');
    }

}