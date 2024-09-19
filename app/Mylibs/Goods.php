<?php // Code within app\Helpers\Helper.php

namespace App\Mylibs;

// use App\Models\Goods\Item;
use App\Models\Goods\Goods as GoodsModels;
use App\Models\Goods\Item;
use App\Models\Goods\Purchase\Purchase;
use App\Models\Goods\Stock\Stock;
use App\Mylibs\Common;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class Goods
{

    public static function barcode()
    {
        $code = strtoupper(Str::random(6));
        $item = Item::where(['barcode' => $code])->first();
        $purchase = Purchase::where(['barcode' => $code])->first();
        if ($item || $purchase) {
            return self::barcode();
        }
        return $code;
    }

    /**
     * format purchase invoice header items with data
     * @param string $id
     * @return array
     */

    public static function formatPurchaseInvoiceHeaderItems($data)
    {
        $items = [
            [
                'X1' => __('Number'),
                'X2' => $data->generated_id,
                'X3' => __('Client'),
                'X4' => $data->to_company,
                'X5' => __('Date'),
                'X6' => Carbon::parse($data->date)->format('Y-m-d'),
            ],
            [
                'X1' => __('Address'),
                'X2' => $data->to_address,
                'X3' => __('Phone'),
                'X4' => Common::formatPhoneNumber($data->to_phone) . ' (' . $data->to_company . ')',
                'X5' => '',
                'X6' => '',
            ],
            [
                'X1' => __('Status'),
                'X2' => __($data->status),
                'X3' => '',
                'X4' => '',
                'X5' => '',
                'X6' => '',
            ],
        ];
        return $items;
    }

    /**
     * format purchase invoice footer items with data
     * @param string $id
     * @return array
     */

    public static function formatPurchaseInvoiceFooterItems($purchase, $totalunit, $subtotal)
    {
        $items = [
            [
                'X1' => __('Total Unit'),
                'X2' => Common::formatNumber($totalunit),
            ],
            [
                'X1' => __('Subtotal'),
                'X2' => Common::formatPrice($subtotal) . ' ' . $purchase->currency,
            ],
        ];
        return $items;
    }

    /**
     * format purchase invoice items with purchase id
     * @param string $id
     * @return array
     */

    public static function formatPurchaseInvoiceItems($id)
    {

        $withs = [
            'items',
            'items.goodsItem',
            'items.goods',
        ];

        $purchase = Purchase::with($withs)
            ->where('id', $id)
            ->first();
        // $items = $purchase->items->toArray();
        // dd($items[0]);
        //  PurchaseItem::where('goods_purchase_id', $id)->get();
        // dd($id, property_exists($purchase, 'items'));
        $items = [];
        if ($purchase) {
            foreach ($purchase->items as $purchaseItem) {
                // dd($purchaseItem->toArray(), $purchaseItem->goods->toArray(), $purchaseItem->goodsItem->toArray());
                $found = false;
                $foundIndex = 0;
                if ($purchaseItem->goodsItem && $purchaseItem->goods) {
                    foreach ($items as $item) {
                        if (array_key_exists('cup', $item) && array_key_exists('color', $item)) {
                            if ($item['cup'] === $purchaseItem->goodsItem->cup &&
                                $item['color'] === $purchaseItem->goodsItem->color) {
                                $found = true;
                                break;
                            }
                        }
                        $foundIndex++;
                    }
                    $index = $foundIndex;
                    if ($found) {
                        $item = $items[$index];
                        if (array_key_exists($purchaseItem->goodsItem->size, $item)) {
                            $unit = $items[$index][$purchaseItem->goodsItem->size]['unit'];
                            $items[$index][$purchaseItem->goodsItem->size]['goods_purchase_item_id'] = $purchaseItem->id;
                            $items[$index][$purchaseItem->goodsItem->size]['goods_item_id'] = $purchaseItem->goodsItem->id;
                            $items[$index][$purchaseItem->goodsItem->size]['barcode'] = $purchaseItem->goodsItem->barcode;
                            $items[$index][$purchaseItem->goodsItem->size]['unit'] = $unit + $purchaseItem->unit;
                        } else {
                            $items[$index][$purchaseItem->goodsItem->size]['goods_purchase_item_id'] = $purchaseItem->id;
                            $items[$index][$purchaseItem->goodsItem->size]['goods_item_id'] = $purchaseItem->goodsItem->id;
                            $items[$index][$purchaseItem->goodsItem->size]['barcode'] = $purchaseItem->goodsItem->barcode;
                            $items[$index][$purchaseItem->goodsItem->size]['unit'] = $purchaseItem->unit;
                        }
                        $items[$index]['total_unit'] = $items[$index]['total_unit'] + $purchaseItem->unit;
                        $items[$index]['cost'] = $items[$index]['cost'] + $purchaseItem->cost;
                        $items[$index]['formatted_cost'] = Common::formatPrice($items[$index]['cost']);
                    } else {
                        // dd($purchaseItem->goodsItem->toArray());
                        $items[] = [
                            'id' => $index + 1,
                            'goods_id' => $purchaseItem->goods->id,
                            'type' => $purchaseItem->goods->type,
                            'name' => $purchaseItem->goods->name,
                            'cup' => $purchaseItem->goodsItem->cup,
                            'color' => $purchaseItem->goodsItem->color,
                            $purchaseItem->goodsItem->size => [
                                'goods_purchase_item_id' => $purchaseItem->id,
                                'goods_item_id' => $purchaseItem->goodsItem->id,
                                'barcode' => $purchaseItem->goodsItem->barcode,
                                'unit' => $purchaseItem->unit,
                            ],
                            'total_unit' => $purchaseItem->unit,
                            'unit_price' => $purchaseItem->unit_price,
                            'formatted_unit_price' => Common::formatPrice($purchaseItem->unit_price),
                            'cost' => $purchaseItem->cost,
                            'formatted_cost' => Common::formatPrice($purchaseItem->cost),
                        ];
                    }
                }
            }
        }

        $count = 5;
        if (count($items) < $count) {
            $count = $count - count($items);
            for ($i = 0; $i < $count; $i++) {
                $items[] = [
                    'id' => null,
                    'goods_id' => null,
                    'type' => null,
                    'name' => null,
                    'cup' => null,
                    'color' => null,
                    'total_unit' => null,
                    'unit_price' => null,
                    'formatted_unit_price' => null,
                    'cost' => null,
                    'formatted_cost' => null,
                ];
            }
        }

        $index = 0;
        foreach ($items as $item) {
            $sizes = config('constant.goods.sizes');
            foreach ($sizes as $size) {
                if (!array_key_exists($size, $item)) {
                    $items[$index][$size] = null;
                    // dd($items[$index]);
                }
            }
            $index++;
        }

        return $items;
    }

    /**
     * format purchase items with supplier id
     * @param string $id
     * @return array
     */

    public static function formatPurchaseItems($id)
    {

        $withs = [
            'items',
            // 'items.goodsItem',
            // 'items.goods',
        ];
        $goods = GoodsModels::with($withs)
            ->where('id', $id)
            ->orWhere('supplier_id', $id)
            ->get();

        $type = 'purchase';
        $items = self::getFormatGoodsItems($type, $goods);

        $index = 0;
        foreach ($items as $item) {
            $sizes = config('constant.goods.sizes');
            foreach ($sizes as $size) {
                if (!array_key_exists($size, $item)) {
                    $items[$index][$size] = null;
                    // dd($items[$index]);
                }
            }
            $index++;
        }
        // dd($items);
        // if (count($items) === 1) {
        //     return $items[0];
        // }

        return $items;
    }

    /**
     * format shipping invoice header items with data
     * @param string $id
     * @return array
     */

    public static function formatShippingInvoiceHeaderItems($data)
    {
        // dd($data->generated_id);
        $items = [
            [
                'X1' => __('Number'),
                'X2' => $data->generated_id,
                'X3' => __('Client'),
                'X4' => $data->client_name,
                'X5' => __('Phone'),
                'X6' => Common::formatPhoneNumber($data->client_phone) . ' (' . $data->client_contact . ')',
            ],
            [
                'X1' => __('Address'),
                'X2' => $data->client_address,
                'X3' => __('Date'),
                'X4' => Carbon::parse($data->created_at)->format('Y-m-d'),
                'X5' => '',
                'X6' => '',
            ],
        ];
        return $items;
    }

    /**
     * format shipping invoice footer items with data
     * @param string $id
     * @return array
     */

    public static function formatShippingInvoiceFooterItems($totalunit, $subtotal, $currency)
    {
        $items = [
            [
                'X1' => __('Total Unit'),
                'X2' => Common::formatNumber($totalunit),
            ],
            [
                'X1' => __('Subtotal'),
                'X2' => Common::formatPrice($subtotal) . ' ' . $currency,
            ],
        ];
        return $items;
    }

    /**
     * format shipping invoice items with purchase id
     * @param string $id
     * @return array
     */

    public static function formatShippingInvoiceItems($data)
    {
        $id = $data->id;
        $status = $data->status;
        $shipItems = $data->shippingStocks;
        // Log::debug($data);
        $items = [];
        foreach ($shipItems as $shipItem) {
            $found = false;
            $foundIndex = 0;
            $stock = $shipItem->stock;
            foreach ($items as $item) {
                if (array_key_exists('cup', $item) &&
                    array_key_exists('color', $item)) {
                    if ($item['cup'] === $stock->goodsItem->cup &&
                        $item['color'] === $stock->goodsItem->color) {
                        $found = true;
                        break;
                    }
                }
                $foundIndex++;
            }
            // dd($stock);
            $index = $foundIndex;
            $disabled = $status === 'DELIVERED' ? true : false;
            $actions = [
                [
                    'key' => Str::random(16),
                    'title' => __('Update'),
                    'color' => "primary",
                    'type' => "Update",
                    'disabled' => $disabled,
                ],
                [
                    'key' => Str::random(16),
                    'title' => __('Return'),
                    'color' => "warning",
                    'type' => "Return",
                    'disabled' => $disabled,
                ],
                [
                    'key' => Str::random(16),
                    'title' => __('Delete'),
                    'color' => "danger",
                    'type' => "Delete",
                    'disabled' => $disabled,
                ],
            ];
            if ($found) {
                $item = $items[$index];
                $stockItemSum = Stock::goodsItemSum($stock->goodsItem->id);
                if (array_key_exists($stock->goodsItem->size, $item)) {
                    $unit = abs($items[$index][$stock->goodsItem->size]['unit']);
                    $items[$index][$stock->goodsItem->size]['goods_shipping_id'] = $id;
                    $items[$index][$stock->goodsItem->size]['goods_shipping_stock_id'] = $stock->id;
                    $items[$index][$stock->goodsItem->size]['goods_item_id'] = $stock->goodsItem->id;
                    $items[$index][$stock->goodsItem->size]['barcode'] = $stock->goodsItem->barcode;
                    $items[$index][$stock->goodsItem->size]['unit'] = $unit + abs($stock->unit);
                    $items[$index][$stock->goodsItem->size]['stock_unit'] = isset($stockItemSum) ? $stockItemSum->unit * 1 : 0;
                    $items[$index][$stock->goodsItem->size]['return_unit'] = $unit + abs($stock->unit);
                } else {
                    $items[$index][$stock->goodsItem->size]['goods_shipping_id'] = $id;
                    $items[$index][$stock->goodsItem->size]['goods_shipping_stock_id'] = $stock->id;
                    $items[$index][$stock->goodsItem->size]['goods_item_id'] = $stock->goodsItem->id;
                    $items[$index][$stock->goodsItem->size]['barcode'] = $stock->goodsItem->barcode;
                    $items[$index][$stock->goodsItem->size]['unit'] = abs($stock->unit);
                    $items[$index][$stock->goodsItem->size]['stock_unit'] = isset($stockItemSum) ? $stockItemSum->unit * 1 : 0;
                    $items[$index][$stock->goodsItem->size]['return_unit'] = abs($stock->unit);
                }
                $items[$index]['total_unit'] = $items[$index]['total_unit'] + abs($stock->unit);
                $items[$index]['cost'] = $items[$index]['cost'] + ($stock->unit_price * abs($stock->unit));
                $items[$index]['formatted_cost'] = Common::formatPrice($items[$index]['cost']);
                $items[$index]['actions'] = $actions;
            } else {
                // dd($purchaseItem->goodsItem->toArray());
                if (isset($stock->goodsItem)) {
                    $stockItemSum = Stock::goodsItemSum($stock->goodsItem->id);
                    $items[] = [
                        'id' => $index + 1,
                        'goods_id' => $stock->goods->id,
                        'type' => $stock->goods->type,
                        'name' => $stock->goods->name,
                        'cup' => $stock->goodsItem->cup,
                        'color' => $stock->goodsItem->color,
                        $stock->goodsItem->size => [
                            'goods_shipping_id' => $id,
                            'goods_shipping_stock_id' => $stock->id,
                            'goods_item_id' => $stock->goodsItem->id,
                            'barcode' => $stock->goodsItem->barcode,
                            'unit' => abs($stock->unit),
                            'stock_unit' => isset($stockItemSum) ? $stockItemSum->unit * 1 : 0,
                            'return_unit' => abs($stock->unit),
                        ],
                        'total_unit' => abs($stock->unit),
                        'unit_price' => $stock->unit_price,
                        'formatted_unit_price' => Common::formatPrice($stock->unit_price),
                        'cost' => $stock->unit_price * abs($stock->unit),
                        'formatted_cost' => Common::formatPrice($stock->unit_price * abs($stock->unit)),
                        'actions' => $actions,
                    ];
                }
            }
        }

        $count = 5;
        if (count($items) < $count) {
            $count = $count - count($items);
            for ($i = 0; $i < $count; $i++) {
                $items[] = [
                    'id' => null,
                    'goods_id' => null,
                    'type' => null,
                    'name' => null,
                    'cup' => null,
                    'color' => null,
                    'total_unit' => null,
                    'unit_price' => null,
                    'formatted_unit_price' => null,
                    'cost' => null,
                    'formatted_cost' => null,
                ];
            }
        }

        $index = 0;
        foreach ($items as $item) {
            $sizes = config('constant.goods.sizes');
            foreach ($sizes as $size) {
                if (!array_key_exists($size, $item)) {
                    $items[$index][$size] = null;
                    // dd($items[$index]);
                }
            }
            $index++;
        }
        // dd($items);
        return $items;
    }

    public static function formatShippingItems($shippingitems)
    {
        $withs = [
            'items',
        ];

        $ids = Arr::pluck($shippingitems, 'goods_id');
        $withs = [
            'items',
        ];
        $goods = GoodsModels::with($withs)
            ->whereIn('id', $ids)
            ->get();
        $type = 'shipping';
        $items = self::getFormatGoodsItems($type, $goods);

        $index = 0;
        $id = 0;
        $final = [];

        foreach ($items as $item) {
            $found = false;
            $sizes = config('constant.goods.sizes');
            foreach ($sizes as $size) {
                if (!array_key_exists($size, $item)) {
                    $items[$index][$size] = null;
                    // dd($items[$index]);
                } else {
                    foreach ($shippingitems as $shippingitem) {
                        if ($shippingitem['id'] === $items[$index][$size]['goods_item_id'] && $shippingitem['unit'] > 0) {
                            // dd($items[$index][$size], $shippingitem);
                            $stock = Stock::goodsItemSum($items[$index][$size]['goods_item_id']);
                            if (isset($stock)) {
                                if ($stock->unit < $shippingitem['unit']) {
                                    $items[$index][$size]['unit'] = $stock->unit;
                                } else {
                                    $items[$index][$size]['unit'] = $shippingitem['unit'];
                                }
                            } else {
                                $items[$index][$size]['unit'] = 0;
                            }
                            $items[$index][$size]['stock_unit'] = isset($stock) ? $stock->unit * 1 : 0;
                            $items[$index]['total_unit'] = $items[$index]['total_unit'] + $items[$index][$size]['unit'];
                            $items[$index]['cost'] = $items[$index]['total_unit'] * $items[$index]['unit_price'];
                            $found = true;
                            $id++;
                        } else {
                            $stock = Stock::goodsItemSum($items[$index][$size]['goods_item_id']);
                            $items[$index][$size]['stock_unit'] = isset($stock) ? $stock->unit * 1 : 0;
                        }
                    }
                }
            }
            if ($found) {
                $items[$index]['id'] = $id;
                $final[] = $items[$index];
            }
            $index++;
        }
        // dd($final);
        return $final;
    }

    public static function formatStockItems($goods)
    {
        $index = 0;
        $items = [];

        foreach ($goods as $_goods) {
            foreach ($_goods->items as $goodsItem) {
                // dd($goodsItem->toArray());
                $found = false;
                $foundIndex = 0;
                foreach ($items as $item) {
                    // dd($item);
                    if (array_key_exists('goods_id', $item) &&
                        array_key_exists('cup', $item) &&
                        array_key_exists('color', $item)) {
                        if ($item['goods_id'] === $_goods->id &&
                            $item['cup'] === $goodsItem->cup &&
                            $item['color'] === $goodsItem->color) {
                            $found = true;
                            break;
                        }
                    }
                    $foundIndex++;
                }
                $index = $foundIndex;
                if ($found) {
                    $stock = Stock::goodsItemSum($goodsItem->id);
                    if ($stock) {
                        $items[$index]['total_unit'] = $items[$index]['total_unit'] * 1 + $stock->unit * 1;
                    }
                    $items[$index][$goodsItem->size]['goods_item_id'] = $goodsItem->id;
                    $items[$index][$goodsItem->size]['barcode'] = $goodsItem->barcode;
                    $items[$index][$goodsItem->size]['unit'] = $stock ? $stock->unit * 1 : 0;
                } else {
                    $items[] = [
                        // 'selected' => false,
                        // 'total_unit' => 0,
                        'id' => $index + 1,
                        'goods_id' => $_goods->id,
                        'type' => $_goods->type,
                        'name' => $_goods->name,
                        'cup' => $goodsItem->cup,
                        'color' => $goodsItem->color,
                        'unit_price' => $_goods->cost_price,
                        'total_unit' => 0,
                        $goodsItem->size => [
                            'goods_item_id' => $goodsItem->id,
                            'barcode' => $goodsItem->barcode,
                            'unit' => 0,
                        ],
                    ];
                }
            }
        }
        return $items;
    }

    public static function getFormatGoodsItems($type, $goods)
    {
        // dd($goods->toArray());
        $index = 0;
        $items = [];

        foreach ($goods as $_goods) {
            foreach ($_goods->items as $goodsItem) {
                // dd($goodsItem->toArray());
                $found = false;
                $foundIndex = 0;
                foreach ($items as $item) {
                    // dd($item);
                    if (array_key_exists('goods_id', $item) &&
                        array_key_exists('cup', $item) &&
                        array_key_exists('color', $item)) {
                        if ($item['goods_id'] === $_goods->id &&
                            $item['cup'] === $goodsItem->cup &&
                            $item['color'] === $goodsItem->color) {
                            $found = true;
                            break;
                        }
                    }
                    $foundIndex++;
                }
                $index = $foundIndex;
                if ($found) {
                    $items[$index][$goodsItem->size]['goods_item_id'] = $goodsItem->id;
                    $items[$index][$goodsItem->size]['barcode'] = $goodsItem->barcode;
                    $items[$index][$goodsItem->size]['unit'] = 0;
                } else {
                    $items[] = [
                        'selected' => false,
                        'total_unit' => 0,
                        'unit_price' => $type === 'purchase' ? $_goods->cost_price : $_goods->wholesale_price,
                        'cost' => 0,
                        'id' => $index + 1,
                        'goods_id' => $_goods->id,
                        'type' => $_goods->type,
                        'name' => $_goods->name,
                        'cup' => $goodsItem->cup,
                        'color' => $goodsItem->color,
                        $goodsItem->size => [
                            'goods_item_id' => $goodsItem->id,
                            'barcode' => $goodsItem->barcode,
                            'unit' => 0,
                        ],
                    ];
                }
            }
        }
        return $items;
    }

    public static function itemHeaders($type)
    {
        switch ($type) {
            case 'BF':
                return [ // uw
                    ['text' => __('Color'), 'value' => "color"],
                    ['text' => __('Size'), 'value' => "size"],
                    ['text' => __('Barcode'), 'value' => "barcode"],
                    ['text' => __('Stock Unit'), 'value' => "stock_unit"],
                    ['text' => __('Updated at'), 'value' => "updated_at"],
                    ['text' => __('Actions'), 'value' => "actions"],
                ];
                break;
            case 'BR':
                return [ // b
                    ['text' => __('Cup'), 'value' => "cup"],
                    ['text' => __('Color'), 'value' => "color"],
                    ['text' => __('Size'), 'value' => "size"],
                    ['text' => __('Barcode'), 'value' => "barcode"],
                    ['text' => __('Stock Unit'), 'value' => "stock_unit"],
                    ['text' => __('Updated at'), 'value' => "updated_at"],
                    ['text' => __('Actions'), 'value' => "actions"],
                ];
                break;
            default:
                return [ // b
                    ['text' => __('Cup'), 'value' => "cup"],
                    ['text' => __('Color'), 'value' => "color"],
                    ['text' => __('Size'), 'value' => "size"],
                    ['text' => __('Barcode'), 'value' => "barcode"],
                    ['text' => __('Stock Unit'), 'value' => "stock_unit"],
                    ['text' => __('Updated at'), 'value' => "updated_at"],
                    ['text' => __('Actions'), 'value' => "actions"],
                ];
                break;
        }
    }

}
