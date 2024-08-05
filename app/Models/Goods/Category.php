<?php

namespace App\Models\Goods;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    use HasUuids;

    protected $table = 'categories';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
    ];
}
