<?php

namespace App\Models\Goods\Purchase;

use App\Models\Goods\Purchase\Item;
use App\Models\Goods\Supplier;
use App\Models\User\Users;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
    //
    use Uuid, SoftDeletes;

    protected $table = 'goods_purchases';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    protected $fillable = [
        'number',
        'supplier_id',
        'user_id',
        'barcode',
        'to_company',
        'to_company_number',
        'to_contact',
        'to_email',
        'to_phone_country_code',
        'to_phone',
        'to_fax_country_code',
        'to_fax',
        'to_address',
        'currency',
        'status',
        'date',
    ];

    protected $appends = [
        'generated_id',
    ];

    public function getGeneratedIdAttribute()
    {
        // Log::debug($this);
        return $this->to_company_number . '-' . sprintf('%08d', $this->number);
    }

    public static function getNumber($supplier_id)
    {
        $count = self::where(['supplier_id' => $supplier_id])->count();
        return $count + 1;
    }

    public function users()
    {
        return $this->hasOne(Users::class, 'id', 'user_id');
    }

    public function supplier()
    {
        return $this->hasOne(Supplier::class, 'id', 'supplier_id');
    }

    public function items()
    {
        return $this->hasMany(Item::class, 'goods_purchase_id');
    }

}