<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    //
    protected $table = 'user_settings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
    ];
}
