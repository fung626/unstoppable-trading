<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Shipping as ShippingResource;
use App\Http\Resources\Goods\Shippings as ShippingsResource;
use App\Models\Goods\Goods;
use App\Models\Goods\Shipping;
use App\Models\Goods\Shipping\Alteration as ShipAlteration;
use App\Models\Goods\Stock\Stock as GoodsStock;
use App\Models\Goods\Stock\StockShipping;
use App\Mylibs\Goods as GoodsLib;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ShippingController extends Controller
{
    //

    protected $withs = [
        'shippingStocks',
        'shippingStocks.stock',
        'shippingStocks.stock.goods',
        'shippingStocks.stock.goodsItem',
    ];

    protected $status = [
        'PENDING',
        'PROCCESSING',
        'DELIVERED',
    ];

    protected $priceTag = 'wholesale_price';

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client' => 'required',
            'client_number' => 'required',
            'client_name' => 'required',
            'client_contact' => 'required',
            'client_phone_country_code' => 'required',
            'client_phone' => 'required',
            'status' => 'required|string',
            'items' => 'required',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            DB::transaction(function () {
                $client = request('client');
                $shipping = Shipping::create([
                    'number' => Shipping::getNumber($client['id']),
                    'client_id' => $client['id'],
                    'client_number' => request('client_number'),
                    'client_name' => request('client_name'),
                    'client_contact' => request('client_contact'),
                    'client_phone_country_code' => request('client_phone_country_code'),
                    'client_phone' => request('client_phone'),
                    'client_email' => request('client_email'),
                    'client_address' => request('client_address'),
                    'currency' => request('currency'),
                    'status' => request('status'),
                ]);

                $items = request('items');
                foreach ($items as $item) {
                    $sizes = config('constant.goods.sizes');
                    foreach ($sizes as $size) {
                        if (array_key_exists($size, $item) && $item[$size] && $item[$size]['unit'] > 0) {
                            $goods = Goods::where(['id' => $item['goods_id']])->first();
                            $stock = GoodsStock::create([
                                'goods_id' => $item['goods_id'],
                                'goods_item_id' => $item[$size]['goods_item_id'],
                                'unit' => -($item[$size]['unit']),
                                'unit_price' => $goods->{$this->priceTag},
                                'type' => 'SHIPPING',
                            ]);
                            StockShipping::create([
                                'goods_shipping_id' => $shipping->id,
                                'goods_shipping_stock_id' => $stock->id,
                            ]);
                        }
                    }
                }
            });
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        return response()->json($response, 200);
    }

    public function get(Request $request)
    {
        $query = Shipping::with($this->withs)
            ->when($request->filled(['id']), function ($query) {
                $id = trim(request('id'));
                return $query->where(function ($query) use ($id) {
                    $query->where('id', $id);
                });
            })
            ->when($request->filled(['client_id']), function ($query) {
                $client_id = trim(request('client_id'));
                return $query->where(function ($query) use ($client_id) {
                    $query->where('client_id', $client_id);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('client_number', 'like', '%' . $keyword . '%')
                        ->orWhere('client_name', 'like', '%' . $keyword . '%')
                        ->orWhere('client_phone_country_code', 'like', '%' . $keyword . '%')
                        ->orWhere('client_phone', 'like', '%' . $keyword . '%')
                        ->orWhere('client_email', 'like', '%' . $keyword . '%')
                        ->orWhere('client_address', 'like', '%' . $keyword . '%');
                });
            })->where('status', '!=', 'DELETED');

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                if ($sortBy === 'generated_id') {
                    // Sort by the underlying columns that make up generated_id
                    $query->orderBy('client_number', $sortDesc ? 'DESC' : 'ASC')
                          ->orderBy('number', $sortDesc ? 'DESC' : 'ASC');
                } elseif ($sortBy !== "actions") {
                    $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                }
                $index++;
            }
        }

        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $resource = new ShippingsResource($result);
            $response['data'] = [
                'data' => $resource,
                'total' => $result->total(),
                'last_page' => $result->lastPage(),
                'current_page' => $result->currentPage(),
                'has_more_pages' => $result->hasMorePages(),
            ];
        } else {
            $result = $query->get();
            $response['data'] = $result;
        }

        return response()->json($response, 200);
    }

    public function details(Request $request)
    {
        $query = Shipping::with($this->withs)
            ->where(['id' => request('id')]);

        $response = config('response.common.success');
        $result = $query->first();
        // dd($result);
        // Log::debug($result);
        $resource = new ShippingResource($result);
        $response['data'] = $resource;
        // dd($response);
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:goods_shippings,id',
            'type' => 'required|string',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $shipping = Shipping::where('id', request('id'))->first();

        if ($shipping->status === 'DELIVERED') {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        try {
            if ($request->filled(['status'])) {
                Shipping::where('id', request('id'))
                    ->update(['status' => request('status')]);
            }
            if ($request->filled(['item'])) {
                $item = request('item');
                switch (request('type')) {
                    case 'DELETE':
                        if ($request->filled(['item'])) {
                            // goods_shipping_stock_id
                            $item = request('item');
                            DB::transaction(function () use ($item) {
                                $sizes = config('constant.goods.sizes');
                                foreach ($sizes as $size) {
                                    if (array_key_exists($size, $item) && $item[$size]) {
                                        $_item = $item[$size];
                                        $shipStock = GoodsStock::where(['id' => $_item['goods_shipping_stock_id']])->first();
                                        if ($shipStock) {
                                            $shipUnit = abs($shipStock->unit);
                                            GoodsStock::where(['id' => $_item['goods_shipping_stock_id']])->delete();
                                            StockShipping::where(['goods_shipping_stock_id' => $_item['goods_shipping_stock_id']])->delete();
                                            ShipAlteration::create([
                                                'goods_item_id' => $_item['goods_item_id'],
                                                'goods_shipping_id' => request('id'),
                                                'goods_stock_id' => $_item['goods_shipping_stock_id'],
                                                'unit' => $shipUnit,
                                                // 'altered_unit' => 0,
                                                'type' => request('type'),
                                            ]);
                                        }
                                    }
                                }
                            });
                        }
                        break;
                    case 'NEW':
                        if ($request->filled(['item'])) {
                            $item = request('item');
                            DB::transaction(function () use ($item) {
                                $sizes = config('constant.goods.sizes');
                                foreach ($sizes as $size) {
                                    if (array_key_exists($size, $item) && $item[$size] && $item[$size]['unit'] > 0) {
                                        $_item = $item[$size];
                                        $stock = GoodsStock::goodsItemSum($_item['goods_item_id']);
                                        $goods = Goods::where(['id' => $item['goods_id']])->first();
                                        $goods_item_id = $item[$size]['goods_item_id'];
                                        $exists = StockShipping::with(['stock'])
                                            ->where(['goods_shipping_id' => request('id')])
                                            ->whereHas('stock', function ($query) use ($goods_item_id) {
                                                $query->where('goods_item_id', $goods_item_id);
                                            })->get();
                                        Log::debug($exists);
                                        if ($exists->count() > 0) {
                                            continue;
                                        }
                                        if ($stock->unit >= $_item['unit']) {
                                            $stock = GoodsStock::create([
                                                'goods_id' => $item['goods_id'],
                                                'goods_item_id' => $item[$size]['goods_item_id'],
                                                'unit' => -($item[$size]['unit']),
                                                'unit_price' => $goods->{$this->priceTag},
                                                'type' => 'SHIPPING',
                                            ]);
                                            StockShipping::create([
                                                'goods_shipping_id' => request('id'),
                                                'goods_shipping_stock_id' => $stock->id,
                                            ]);
                                        }
                                    }
                                }
                            });
                        }
                        break;
                    case 'UPDATE':
                        DB::transaction(function () use ($item) {
                            $sizes = config('constant.goods.sizes');
                            foreach ($sizes as $size) {
                                if ($item[$size]) {
                                    $_item = $item[$size];
                                    $stock = GoodsStock::goodsSum($_item['goods_item_id']);
                                    $shipStock = GoodsStock::where(['id' => $_item['goods_shipping_stock_id']])->first();
                                    $shipUnit = abs($shipStock->unit);
                                    if ($shipUnit != $_item['unit'] && $_item['unit'] > 0) {
                                        ShipAlteration::create([
                                            'goods_item_id' => $_item['goods_item_id'],
                                            'goods_shipping_id' => request('id'),
                                            'goods_stock_id' => $_item['goods_shipping_stock_id'],
                                            'unit' => $shipUnit,
                                            'altered_unit' => $_item['unit'],
                                            'type' => request('type'),
                                        ]);
                                        GoodsStock::where('id', $_item['goods_shipping_stock_id'])
                                            ->update(['unit' => -($_item['unit'])]);
                                    }
                                }
                            }
                        });
                        break;
                    case 'RETURN':
                        DB::transaction(function () use ($item) {
                            $sizes = config('constant.goods.sizes');
                            foreach ($sizes as $size) {
                                if ($item[$size]) {
                                    $_item = $item[$size];
                                    $shipStock = GoodsStock::where(['id' => $_item['goods_shipping_stock_id']])->first();
                                    $shipUnit = abs($shipStock->unit);
                                    $alteredUnit = $shipUnit - $_item['return_unit'];
                                    if ($alteredUnit > 0 && $_item['return_unit'] > 0) {
                                        ShipAlteration::create([
                                            'goods_item_id' => $_item['goods_item_id'],
                                            'goods_shipping_id' => request('id'),
                                            'goods_stock_id' => $_item['goods_shipping_stock_id'],
                                            'unit' => $shipUnit,
                                            'altered_unit' => $alteredUnit,
                                            'type' => request('type'),
                                        ]);
                                        GoodsStock::where('id', $_item['goods_shipping_stock_id'])
                                            ->update(['unit' => -($alteredUnit)]);
                                    }
                                }
                            }
                        });
                        break;
                }

            }
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $query = Shipping::with($this->withs)
            ->where(['id' => request('id')]);

        $response = config('response.common.success');
        $result = $query->first();
        $resource = new ShippingResource($result);
        $response['data'] = $resource;
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        $query = Shipping::with($this->withs)
            ->when($request->filled(['id']), function ($query) {
                $id = trim(request('id'));
                return $query->where(function ($query) use ($id) {
                    $query->where('id', $id);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('client_number', 'like', '%' . $keyword . '%')
                        ->orWhere('client_name', 'like', '%' . $keyword . '%')
                        ->orWhere('client_phone_country_code', 'like', '%' . $keyword . '%')
                        ->orWhere('client_phone', 'like', '%' . $keyword . '%')
                        ->orWhere('client_email', 'like', '%' . $keyword . '%')
                        ->orWhere('client_address', 'like', '%' . $keyword . '%');
                });
            });

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                if ($sortBy === 'generated_id') {
                    // Sort by the underlying columns that make up generated_id
                    $query->orderBy('client_number', $sortDesc ? 'DESC' : 'ASC')
                          ->orderBy('number', $sortDesc ? 'DESC' : 'ASC');
                } elseif ($sortBy !== "actions") {
                    $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                }
                $index++;
            }
        }
        $result = $query->get();
        $headers = [
            __('Number'),
            __('Name'),
            __('Phone'),
            __('Email'),
            __('Address'),
            __('Total Unit'),
            __('Subtotal'),
            __('Updated at'),
        ];
        $rows = [];
        $resource = new ShippingsResource($result);
        $resource = $resource->resolve();
        foreach ($resource as $item) {
            $row = [
                $item['generated_id'],
                $item['client_name'],
                $item['formated_phone'],
                $item['client_email'],
                $item['client_address'],
                $item['total_unit'],
                $item['subtotal'],
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Shipping'), $rows, $headers, 'pdf');

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

    public function format(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $data = GoodsLib::formatShippingItems(request('items'));

        $response = config('response.common.success');
        $response['data'] = $data;
        return response()->json($response, 200);
    }

}