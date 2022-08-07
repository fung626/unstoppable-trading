<?php

namespace App\Models\User;

use App\Models\User\Users;
use Illuminate\Database\Eloquent\Model;

class Duty extends Model
{
    //
    protected $table = 'user_duties';

    /* The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'date',
        'start',
        'end',
    ];

    public function user()
    {
        return $this->hasOne(Users::class, 'id', 'user_id');
    }
}
