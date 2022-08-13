<?php

namespace App\Models\User;

use App\Models\User\Users;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //
    protected $table = 'user_employees';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'salary',
        'employee_mandatory_contribution',
        'employer_mandatory_contribution',
        'type',
        'joined_at',
        'left_at',
    ];

    public function user()
    {
        return $this->hasOne(Users::class, 'user_id');
    }
}
