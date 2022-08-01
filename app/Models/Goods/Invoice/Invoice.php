<?php

namespace App\Models\Goods\Invoice;

use App\Models\Goods\Invoice\Item;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    //
    use Uuid;

    protected $table = 'invoice';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'client_id',
        'status',
        'address',
        'date',
    ];

    public function items()
    {
        return $this->hasMany(Item::class, 'invoice_id');
    }

}