<?php

namespace App\Models\Goods\Warehouse;

use App\Models\Goods\Goods;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    //
    use HasUuids;

    use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

    protected $table = 'warehouses';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $appends = ['name'];

    protected $guarded = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sector',
        'shelf',
        'segment',
        'description',
    ];

    public function getNameAttribute()
    {
        $name = __('Sector') . ' ' . $this->sector;
        $name .= empty($this->shelf) ? '' : ' ' . __('Shelf') . ' ' . $this->shelf;
        $name .= empty($this->segment) ? '' : ' ' . __('Segment') . ' ' . $this->segment;
        return $name;
        // return __('Sector') . ' ' . $this->sector . ' ' . __('Shelf') . ' ' . $this->shelf . ' ' . __('Segment') . ' ' . $this->segment;
    }

    public function goods()
    {
        return $this->hasManyJson(Goods::class, 'warehouses');
    }

}
