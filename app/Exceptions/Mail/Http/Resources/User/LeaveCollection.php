<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\ResourceCollection;

class LeaveCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
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
                'remark' => $item->remark,
                'approved' => $item->approved,
                'approved_by' => $item->approved_by,
                'user' => $item->user,
                'updated_at' => $item->updated_at,
                'created_at' => $item->created_at,
                'actions' => [
                    [
                        'key' => 1,
                        'title' => __("Approve"),
                        'color' => "info",
                        'type' => "Approve",
                        'disabled' => $item->approved === null ? false : true,
                    ],
                    [
                        'key' => 2,
                        'title' => __("Reject"),
                        'color' => "info",
                        'type' => "Reject",
                        'disabled' => $item->approved === null ? false : true,
                    ],
                    [
                        'key' => 3,
                        'title' => __("Details"),
                        'color' => "primary",
                        'type' => "RouterPush",
                        'route' => "LeaveDetails",
                        'disabled' => false,
                    ],
                    [
                        'key' => 4,
                        'title' => __("Delete"),
                        'color' => "danger",
                        'type' => "Delete",
                        'disabled' => $item->approved === null ? false : true,
                    ],
                ],
            ];
        });
    }
}