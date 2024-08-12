<?php

namespace App\Models\Goods;

use App\Models\User\Users;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    //
    use HasUuids;

    // use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

    protected $table = 'goods_contents';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'goods_id',
        'key',
        'value',
        'created_by',
    ];

    public function creator()
    {
        return $this->hasOne(Users::class, 'id', 'created_by');
    }

}
