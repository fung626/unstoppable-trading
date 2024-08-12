<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Goods as GoodsResource;
use App\Models\Goods\Content;
use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use App\Mylibs\Goods as GoodsLib;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Validator;

class GoodsController extends Controller
{
    //
    protected $withs = [
        'supplier',
        'categories',
        'warehouses',
        'creator',
        // 'items',
        // 'contents',
    ];

    public function __construct()
    {
        DB::enableQueryLog();
    }

    public function post(Request $request)
    {

        // Log::info('post');
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'cost_price' => 'required|numeric',
            'wholesale_price' => 'required|numeric',
            'retail_price' => 'required|numeric',
            'type' => 'required|string',
            'image' => 'nullable|string',
            'file_extension' => 'nullable|string',
            'supplier' => 'required|array',
            'categories' => 'nullable|array',
            'warehouses' => 'nullable|array',
            'contents' => 'nullable|array',
            'items' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        if ($request->filled(['image', 'file_extension'])) {
            $file = 'goods-' . time() . '-' . Str::random(8) . '.' . request('file_extension');
            $localPath = config('storage.goods.image') . $file;
            Storage::disk('local')->put($localPath, base64_decode(request('image')));
            $exists = Storage::disk('local')->has($localPath);
            if (!$exists) {
                $response = config('response.common.fail.parameter');
                return response()->json($response, 400);
            }
        }

        try {

            DB::transaction(function () {
                // $categories = json_decode(request('categories'));
                $user = Auth::user();
                $supplier = request('supplier');
                $categories = array_column(request('categories'), 'id');
                $warehouses = array_column(request('warehouses'), 'id');
                // dd($supplier['id']);
                $goods = Goods::create([
                    'name' => request('name'),
                    'cost_price' => request('cost_price'),
                    'wholesale_price' => request('wholesale_price'),
                    'retail_price' => request('retail_price'),
                    'image' => request('image'),
                    'type' => request('type'),
                    'stock_alert' => request('stock_alert'),
                    'supplier_id' => $supplier['id'],
                    'categories' => $categories,
                    'warehouses' => $warehouses,
                    'created_by' => $user->id,
                    // 'contents' => request('contents'),
                ]);

                $items = request('items');
                if (is_array($items)) {
                    foreach ($items as $item) {
                        $goodsItem = Item::where([
                            'goods_id' => $goods->id,
                            'cup' => isset($item['cup']['name']) ? $item['cup']['name'] : null,
                            'size' => $item['size']['name'],
                            'color' => $item['color']['name'],
                        ])->first();
                        if ($goods->type === 'BR') {
                            if (isset($item['cup']['name']) && isset($item['size']['name']) && isset($item['color']['name'])) {
                                if (!$goodsItem) {
                                    Item::create([
                                        'goods_id' => $goods->id,
                                        'barcode' => isset($item['barcode']) ? $item['barcode'] : GoodsLib::barcode(),
                                        'cup' => $item['cup']['name'],
                                        'size' => $item['size']['name'],
                                        'color' => $item['color']['name'],
                                        'created_by' => $user->id,
                                    ]);
                                }
                            }
                        } else {
                            if (isset($item['size']['name']) && isset($item['color']['name'])) {
                                if (!$goodsItem) {
                                    Item::create([
                                        'goods_id' => $goods->id,
                                        'barcode' => isset($item['barcode']) ? $item['barcode'] : GoodsLib::barcode(),
                                        'size' => $item['size']['name'],
                                        'color' => $item['color']['name'],
                                        'created_by' => $user->id,
                                    ]);
                                }
                            }
                        }
                    }
                }

                $contents = request('contents');
                if (is_array($contents)) {
                    foreach ($contents as $content) {
                        Content::create([
                            'goods_id' => $goods->id,
                            'key' => isset($content['key']) ? $content['key'] : null,
                            'value' => isset($content['value']) ? $content['value'] : null,
                            'created_by' => $user->id,
                        ]);
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

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:goods,id',
            'name' => 'required|string',
            'cost_price' => 'required|numeric',
            'wholesale_price' => 'required|numeric',
            'retail_price' => 'required|numeric',
            'type' => 'required|string',
            'image' => 'nullable|string',
            'file_extension' => 'nullable|string',
            'supplier' => 'required|array',
            'categories' => 'nullable|array',
            'warehouses' => 'nullable|array',
            'contents' => 'nullable|array',
            'items' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            $input = collect(request()->all())->filter(function ($value) {
                return null !== $value;
            })->toArray();

            $supplier_id = null;
            $categories = [];
            $warehouses = [];

            if ($request->filled('supplier')) {
                $supplier = request('supplier');
                $supplier_id = $supplier['id'];
            } else if ($request->filled('supplier_id')) {
                $supplier = request('supplier_id');
            }

            if ($request->filled('warehouses')) {
                if (count(request('warehouses')) > 0) {
                    $has = Arr::has(request('warehouses')[0], 'id');
                    // Log::debug($has);
                    if ($has) {
                        $warehouses = Arr::pluck(request('warehouses'), 'id');
                    } else {
                        $warehouses = request('warehouses');
                    }
                }
            }

            if ($request->filled('categories')) {
                if (count(request('categories')) > 0) {
                    $has = Arr::has(request('categories')[0], 'id');
                    // Log::debug($has);
                    if ($has) {
                        $categories = Arr::pluck(request('categories'), 'id');
                    } else {
                        $categories = request('categories');
                    }
                }
            }
            // Log::debug($categories);
            Goods::where(['id' => request('id')])
                ->update([
                    'name' => request('name'),
                    'cost_price' => request('cost_price'),
                    'wholesale_price' => request('wholesale_price'),
                    'retail_price' => request('retail_price'),
                    // 'type' => request('type'),
                    'stock_alert' => request('stock_alert'),
                    'supplier_id' => $supplier_id,
                    'categories' => $categories,
                    'warehouses' => $warehouses,
                    'description' => request('description'),
                ]);

        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        // \Artisan::call('json:goods');
        $goods = Goods::with($this->withs)
            ->where(['id' => request('id')])
            ->first();
        if (!$goods) {
            $response = config('response.common.fail.data');
            return response()->json($response, 400);
        }

        // if ($goods->supplier) {
        //     $goods->supplier = Supplier::where('id', $goods->supplier_id)->first();
        // }
        // if ($goods->categories) {
        //     $goods->categories = Category::whereIn('id', $goods->categories)->get();
        // }

        $response = config('response.common.success');
        $response['data'] = $goods;
        return response()->json($response, 200);
    }

    public function get(Request $request)
    {

        $query = Goods::with($this->withs)
            ->when($request->filled(['id']), function ($query) {
                $id = trim(request('id'));
                return $query->where(function ($query) use ($id) {
                    $query->where('id', $id);
                });
            })
            ->when($request->filled(['supplier_id']), function ($query) {
                $supplier_id = trim(request('supplier_id'));
                return $query->where(function ($query) use ($supplier_id) {
                    $query->where('supplier_id', $supplier_id);
                });
            })
            ->when($request->filled(['category_id']), function ($query) {
                $category_id = trim(request('category_id'));
                return $query->whereHas('categories', function ($query) use ($category_id) {
                    $query->where('id', $category_id);
                });
            })
            ->when($request->filled(['warehouse_id']), function ($query) {
                $warehouse_id = trim(request('warehouse_id'));
                return $query->whereHas('warehouses', function ($query) use ($warehouse_id) {
                    $query->where('id', $warehouse_id);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('name', 'like', '%' . $keyword . '%')
                        ->orWhere('type', 'like', '%' . $keyword . '%');
                });
            });

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                if ($sortBy !== "actions") {
                    $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                }
                $index++;
            }
        }

        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $resource = new GoodsResource($result);
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
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $goods = Goods::with($this->withs)
            ->where(['id' => request('id')])
            ->first();
        if (!$goods) {
            $response = config('response.common.fail.data');
            return response()->json($response, 400);
        }

        $response = config('response.common.success');
        $response['data'] = $goods;
        return response()->json($response, 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $goods = Goods::where(['id' => request('id')])->first();

        try {

            DB::transaction(function () {
                Goods::where(['id' => request('id')])->delete();
                Item::where(['goods_id' => request('id')])->delete();
                Content::where(['goods_id' => request('id')])->delete();
            });

        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        // \Artisan::call('json:goods');

        $response = config('response.common.success');
        $response['data'] = $goods;
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        $query = Goods::with($this->withs)
            ->when($request->filled(['id']), function ($query) {
                $id = trim(request('id'));
                return $query->where(function ($query) use ($id) {
                    $query->where('id', $id);
                });
            })
            ->when($request->filled(['supplier_id']), function ($query) {
                $supplier_id = trim(request('supplier_id'));
                return $query->where(function ($query) use ($supplier_id) {
                    $query->where('supplier_id', $supplier_id);
                });
            })
            ->when($request->filled(['category_id']), function ($query) {
                $category_id = trim(request('category_id'));
                return $query->whereHas('categories', function ($query) use ($category_id) {
                    $query->where('id', $category_id);
                });
            })
            ->when($request->filled(['warehouse_id']), function ($query) {
                $warehouse_id = trim(request('warehouse_id'));
                return $query->whereHas('warehouses', function ($query) use ($warehouse_id) {
                    $query->where('id', $warehouse_id);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('name', 'like', '%' . $keyword . '%')
                        ->orWhere('type', 'like', '%' . $keyword . '%');
                });
            });

        if ($request->filled(['sort_by', 'sort_desc'])) {
            $sortBys = request('sort_by');
            $sortDescs = request('sort_desc');
            $index = 0;
            foreach ($sortBys as $sortBy) {
                $sortDesc = $sortDescs[$index];
                if ($sortBy !== "actions") {
                    $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
                }
                $index++;
            }
        }

        $result = $query->get();
        $headers = [
            __('Name'),
            __('Type'),
            __('Warehouse'),
            __('Stock Unit'),
            __('Supplier'),
            __('Categories'),
            __('Updated at'),
        ];
        $rows = [];
        $resource = new GoodsResource($result);
        $resource = $resource->resolve();
        foreach ($resource as $item) {
            $_warehouses = $item['warehouses'];
            $warehouses = [];
            foreach ($_warehouses as $warehouse) {
                $warehouses[] = $warehouse['sector'] . __('Sector') . ' ' . $warehouse['shelf'] . __('Shelf') . ' ' . $warehouse['segment'] . __('Segment');
            }
            $_categories = $item['categories'];
            $categories = [];
            foreach ($_categories as $category) {
                $categories[] = $category['name'];
            }

            $row = [
                $item['name'],
                $item['type'],
                implode(", ", $warehouses),
                $item['stock_unit'],
                $item['supplier']['name'],
                implode(", ", $categories),
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Goods'), $rows, $headers, 'pdf');

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}
