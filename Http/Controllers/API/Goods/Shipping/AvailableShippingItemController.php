<?php

namespace App\Http\Controllers\API\Goods\Shipping;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Shipping\AvailableShippingItems as AvailableShippingItemsCollection;
use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use App\Models\Goods\Stock\StockShipping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

// use Illuminate\Support\Facades\Log;

class AvailableShippingItemController extends Controller
{
    //
    protected $withs = [
        'goods.supplier',
        'goods',
    ];

    public function get(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'goods_shipping_id' => 'required|string|exists:goods_ship,id',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $sizes = config('constant.goods.sizes');
        $select = [
            // 'id',
            'goods_id',
            'color',
            'cup',
        ];
        $index = count($select);
        foreach ($sizes as $size) {
            $select[$index] = DB::raw('null as ' . '"' . $size . '"');
            $index++;
        }

        $excludedIds = [];
        $ships = StockShipping::with([
            'stock',
            'stock.goods',
            'stock.goodsItem',
        ])->where(['goods_shipping_id' => request('goods_shipping_id')])
            ->get();
        $excludedIds = [];
        // dd($stocks);
        if ($ships) {
            foreach ($ships as $shipping) {
                $excludedIds[] = $shipping->stock->goodsItem->id;
            }
        }

        $query = Item::with($this->withs)
            ->whereNotIn('goods_item.id', $excludedIds)
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('goods_item.id', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_item.cup', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_item.size', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_item.color', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_item.barcode', 'like', '%' . $keyword . '%');
                })->orWhereHas('goods', function ($query) use ($keyword) {
                    $query->where('goods.id', 'like', '%' . $keyword . '%')
                        ->orWhere('goods.name', 'like', '%' . $keyword . '%')
                        ->orWhere('goods.type', 'like', '%' . $keyword . '%');
                });
            })
            ->select($select)
            ->join('goods', 'goods.id', '=', 'goods_item.goods_id')
            ->groupBy(['goods_id', 'color', 'cup']);

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                $index++;
            }
            $query->orderBy('goods_item.updated_at', $sortDesc ? 'DESC' : 'ASC');
        }

        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $resource = new AvailableShippingItemsCollection($result);
            $resource = $resource->resolve();
            $data = [];
            foreach ($resource as $item) {
                $available = true;
                foreach ($sizes as $size) {
                    if ($item[$size]) {
                        foreach ($excludedIds as $id) {
                            // Log::debug($item[$size]['goods_item_id']);
                            if ($item[$size]['goods_item_id'] === $id) {
                                $available = false;
                            }
                        }
                    }
                }
                if ($available) {
                    $data[] = $item;
                }
            }
            $response['data'] = [
                'data' => $data,
                'total' => $result->total(),
                'last_page' => $result->lastPage(),
                'current_page' => $result->currentPage(),
                'has_more_pages' => $result->hasMorePages(),
            ];
            // dd($response);
        } else {
            $result = $query->get();
            $resource = new AvailableShippingItemsCollection($result);
            $resource = $resource->resolve();
            $data = [];
            foreach ($resource as $item) {
                // Log::debug($item);
                $available = true;
                foreach ($sizes as $size) {
                    if ($item[$size]) {
                        foreach ($excludedIds as $id) {
                            if ($item[$size]['goods_item_id'] === $id) {
                                $available = false;
                            }
                        }
                    }
                }
                if ($available) {
                    $data[] = $item;
                }
            }
            $response['data'] = $data;
        }

        return response()->json($response, 200);

    }

}
