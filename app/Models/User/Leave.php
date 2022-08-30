<?php

namespace App\Models\User;

use App\Models\User\Users;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;
    //
    protected $table = 'user_leaves';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'start',
        'end',
        'remark',
        'approved',
        'approved_by',
    ];

    public function user()
    {
        return $this->hasOne(Users::class, 'user_id');
    }

    public function approvedBy()
    {
        return $this->hasOne(Users::class, 'approved_by');
    }

}