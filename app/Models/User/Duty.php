<?php

namespace App\Models\User;

use App\Models\User\Users;
use Carbon\Carbon;
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
        'editable',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'formatted_start',
        'formatted_end',
    ];

    protected $casts = [
        'editable' => 'boolean',
    ];

    public function getFormattedStartAttribute()
    {
        return Carbon::parse($this->start)->format('H:i');
    }

    public function getFormattedEndAttribute()
    {
        return Carbon::parse($this->end)->format('H:i');
    }

    public function getEditableAttribute()
    {
        return $this->attributes['editable'] === 1;
    }

    public function user()
    {
        return $this->hasOne(Users::class, 'id', 'user_id');
    }
}