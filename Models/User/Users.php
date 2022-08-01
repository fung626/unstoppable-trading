<?php

namespace App\Models\User;

use App\Models\User\Employee;
use App\Models\User\Permission;
use App\Notifications\MyWelcomeNotification;
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

    public function sendWelcomeNotification(\Carbon\Carbon $validUntil, $password)
    {
        $this->notify(new MyWelcomeNotification($validUntil, $password));
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