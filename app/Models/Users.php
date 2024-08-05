<?php

namespace App\Models;

use App\Models\OAuth\AccessToken;
use App\Models\Setting\Binding\Provider as BindingProvider;
use App\Models\User\Address;
use App\Mylibs\Common;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;

class Users extends Authenticatable
{

    use HasApiTokens, Notifiable, SoftDeletes;

    public $incrementing = false;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'transaction_password',
    ];

    protected $fillable = [
        'id',
        'name',
        'email',
        'phone',
        'region',
        'password',
        'transaction_password',
        'referred_by',
        'platform',
        'role',
        'available',
        'verified',
    ];

    protected $appends = [
        'account',
        'formatted_phone',
        'primary_address',
        'invited_users',
        'referred_by_account',
        'referred',
    ];

    protected $casts = [
        'available' => 'boolean',
    ];

    public function tokenExpired()
    {
        if (Carbon::parse($this->token()->expires_at) < Carbon::now()) {
            return true;
        }
        return false;
    }

    public static function verifyTransactionPassword($password)
    {
        $user = Auth::user();
        if (!$user) {return false;}
        // $user = self::where('id', $user->id);

        if (!empty($user->transaction_password)) {
            // dd(bcrypt($password));
            // dd(Hash::check($password, $user->transaction_password));
            if (Hash::check($password, $user->transaction_password)) {
                return true;
            }
        }
        $result = self::where('id', $user->id)
            ->where('transaction_password', hash('sha512', $password))
            ->first();
        return $result ? true : false;
    }

    public static function isVerified($where = false)
    {
        $result = self::where(['verified' => 1])
            ->when($where, function ($query, $where) {
                return $query->where($where);
            })->count();
        return $result > 0 ? true : false;
    }

    public static function monthly()
    {
        return self::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(created_at) as count '))
            ->groupBy(DB::raw('year, month'))
            ->orderBy(DB::raw('year, month'))
            ->get();
    }

    public static function hourly($date = false)
    {
        if (!$date) {
            $date = DB::raw('CURDATE()');
        }
        return self::select(
            DB::raw('HOUR(created_at) as hour'),
            DB::raw('COUNT(created_at) as count '))
            ->where(DB::raw('DATE(created_at)'), $date)
            ->groupBy(DB::raw('hour'))
            ->orderBy(DB::raw('hour'))
            ->get();
    }

    public function getAccountAttribute()
    {
        return Common::formatAccountId($this->id);
    }

    public function getFormattedPhoneAttribute()
    {
        if ($this->phone && $this->available) {
            try {
                switch ($this->region) {
                    case 852:
                        $code = "HK";
                        break;
                    case 86:
                        $code = "CN";
                        break;
                    default:
                        $code = "HK";
                        break;
                }
                $phoneUtil = \libphonenumber\PhoneNumberUtil::getInstance();
                $numberProto = $phoneUtil->parse($this->phone, $code);
                $isValid = $phoneUtil->isValidNumber($numberProto);
                $format = $phoneUtil->format($numberProto, \libphonenumber\PhoneNumberFormat::INTERNATIONAL);
                return $isValid ? $format : null;
            } catch (\Exception $e) {
                return null;
            }
        }
        return null;
    }

    public function getPrimaryAddressAttribute()
    {
        $result = Address::where(['user_id' => $this->id])->first();
        return $result ? $result->address : null;
    }

    public function getInvitedUsersAttribute()
    {
        $result = self::where(['referred_by' => $this->id])->get();
        return $result;
    }

    public function getReferredByAccountAttribute()
    {
        return Common::formatAccountId($this->referred_by);
    }

    public function getReferredAttribute()
    {
        return !Common::IsNullOrEmpty($this->referred_by) ? true : false;
    }

    public function addresses()
    {
        return $this->hasMany(Address::class, 'user_id');
    }

    public function accessTokens()
    {
        return $this->hasMany(AccessToken::class, 'user_id');
    }

    public function bindingProvider()
    {
        return $this->hasOne(BindingProvider::class, 'user_id');
    }

}
