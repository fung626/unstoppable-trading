<?php

namespace App\Models\Goods;

use App\Models\Goods\Goods;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{

    use HasUuids;

    //
    protected $table = 'suppliers';

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
        'contact',
        'phone_country_code',
        'phone',
        'fax_country_code',
        'fax',
        'email',
        'address',
        'cost_price_currency',
    ];

    public function goods()
    {
        return $this->hasMany(Goods::class, 'supplier_id');
    }
}
