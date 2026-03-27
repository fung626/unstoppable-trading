<?php

namespace App\Models\Client;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    use Uuid;

    //
    protected $table = 'clients';

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
        'email',
        'address',
        'currency',
        'grade',
    ];
}