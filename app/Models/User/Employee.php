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
        // 'employee_mandatory_contribution',
        // 'employer_mandatory_contribution',
        'employee_contribution',
        'employer_contribution',
        'type',
        'joined_at',
        'left_at',
        'annual_leave_days',
        'duty_default_color',
    ];

    public function user()
    {
        return $this->hasOne(Users::class, 'user_id');
    }
}
