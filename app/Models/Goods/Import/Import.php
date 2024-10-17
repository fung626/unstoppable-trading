<?php

namespace App\Models\Goods\Import;

use App\Models\Goods\Purchase\Item;
use App\Models\Goods\Supplier;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Import extends Model
{
    //
    use HasUuids, SoftDeletes;

    protected $table = 'goods_imports';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    protected $fillable = [
        'supplier_id',
    ];

    protected $appends = [
        'generated_id',
    ];

    public function supplier()
    {
        return $this->hasOne(Supplier::class, 'id', 'supplier_id');
    }

    public function items()
    {
        return $this->hasMany(Item::class, 'goods_purchase_id');
    }

}
