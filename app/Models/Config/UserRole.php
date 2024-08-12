<?php

namespace App\Models\Config;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    //
    protected $table = 'config_user_roles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'functions',
    ];

    protected $casts = [
        'functions' => 'array',
    ];
}
