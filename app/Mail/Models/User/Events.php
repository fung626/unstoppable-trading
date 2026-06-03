<?php

namespace App\Models\User;

use App\Models\User\Users;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    //
    //
    protected $table = 'user_events';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'type',
    ];

    public function user()
    {
        return $this->hasOne(Users::class, 'user_id');
    }
}
