<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class DutyCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return $this->collection->transform(function ($item) use ($request) {
            return [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'start' => $item->start,
                'end' => $item->end,
                'color' => $item->color,
                'user' => $item->user,
                'updated_at' => $item->updated_at,
                'created_at' => $item->created_at,
                'actions' => [
                    [
                        'key' => 1,
                        'title' => __("Create") . ' ' . __("Duty"),
                        'color' => "info",
                        'type' => "Create",
                        'route' => "/duty/create/" . $item->user_id,
                        'disabled' => false,
                    ],
                    [
                        'key' => 2,
                        'title' => __("Details"),
                        'color' => "primary",
                        'type' => "RouterPush",
                        'route' => "/duty/details/" . $item->id,
                        'disabled' => false,
                    ],
                    [
                        'key' => 3,
                        'title' => __("Delete"),
                        'color' => "danger",
                        'type' => "Delete",
                        'disabled' => $item->editable ? false : true,
                    ],
                ],
            ];
        });
    }
}
