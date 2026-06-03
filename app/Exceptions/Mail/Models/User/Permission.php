<?php

namespace App\Models\User;

use App\Models\User\Users;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    //
    protected $table = 'user_permissions';

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

    public function user()
    {
        return $this->hasOne(Users::class, 'id', 'user_id');
    }
}