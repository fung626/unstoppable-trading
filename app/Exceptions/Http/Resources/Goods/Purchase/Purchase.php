<?php

namespace App\Http\Resources\Goods\Purchase;

use Illuminate\Http\Resources\Json\JsonResource;

class Purchase extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        $items = [];
        $subtotal = 0;
        $totalunit = 0;
        foreach ($this->items as $_item) {
            // dd($_item->goodsItem);
            $totalunit += $_item->unit;
            $subtotal += $_item->unit * $_item->unit_price;
            $_item->name = empty($_item->goods->name) ? null : $_item->goods->name;
            $_item->cup = $_item->goodsItem->cup;
            $_item->size = $_item->goodsItem->size;
            $_item->color = $_item->goodsItem->color;
            $_item->barcode = $_item->goodsItem->barcode;
            $_item->received_unit = $_item->unit;
            $items[] = $_item;
        }
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "supplier_id" => $this->supplier_id,
            "generated_id" => $this->generated_id,
            "currency" => $this->currency,
            "to_address" => $this->to_address,
            "to_company" => $this->to_company,
            "to_email" => $this->to_email,
            "to_phone_country_code" => $this->to_phone_country_code,
            "to_phone" => $this->to_phone,
            "to_fax_country_code" => $this->to_fax_country_code,
            "to_fax" => $this->to_fax,
            "status" => $this->status,
            "subtotal" => $subtotal,
            "totalunit" => $totalunit,
            "date" => $this->date,
            "items" => $items,
            "supplier" => $this->supplier,
            "users" => $this->users,
            "updated_at" => $this->updated_at,
            "created_at" => $this->created_at,
        ];
    }
}