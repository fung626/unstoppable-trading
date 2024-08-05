<?php

namespace App\Models\User;

use App\Models\User\Employee;
use App\Models\User\Permission;
use App\Notifications\MyWelcomeNotification;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use \Spatie\WelcomeNotification\ReceivesWelcomeNotification;

class Users extends Authenticatable
{

    use HasApiTokens, Notifiable, SoftDeletes, ReceivesWelcomeNotification;
    //

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'phone',
        'email',
        'role',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'transaction_password',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'is_admin',
        'is_employee',
    ];

    public function sendWelcomeNotification(\Carbon\Carbon $validUntil, $password)
    {
        $this->notify(new MyWelcomeNotification($validUntil, $password));
    }

    /**
     * Send a password reset notification to the user.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $url = env('APP_URL') . 'auth/forgot/password/reset/' . $this->id . '/' . $token;
        $this->notify(new ResetPasswordNotification($url));
    }

    public function getIsAdminAttribute()
    {
        return $this->role === 'ADMIN';
    }

    public function getIsEmployeeAttribute()
    {
        return $this->role === 'EMPLOYEE';
    }

    public function employee()
    {
        return $this->hasOne(Employee::class, 'user_id');
    }

    public function permission()
    {
        return $this->hasOne(Permission::class, 'user_id');
    }
}
