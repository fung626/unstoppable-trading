<?php

namespace App\Models\Goods\Import;

// use App\Models\Goods\Shipping;
use App\Models\Goods\Import\Import;
use App\Models\Goods\Stock\Stock;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class StockImport extends Model
{
    //
    use HasUuids;

    protected $table = 'goods_stock_imports';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'goods_import_id',
        'goods_stock_id',
    ];

    public function import()
    {
        return $this->hasOne(Import::class, 'id', 'goods_import_id');
    }

    public function stock()
    {
        return $this->hasOne(Stock::class, 'id', 'goods_stock_id');
    }

}
