<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Item as ItemResource;
use App\Http\Resources\Goods\Items as ItemsResource;
use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use App\Models\Goods\Purchase\Item as PurchaseItem;
use App\Models\Goods\Stock\StockTake as PurchaseStockTake;
use App\Mylibs\Goods as GoodsLib;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Validator;

class ItemController extends Controller
{
    //

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "goods_id" => 'required|string',
            "cup" => 'nullable|string',
            "size" => 'required|in:' . implode(',', config('constant.goods.sizes')),
            "color" => 'required|in:' . implode(',', config('constant.goods.colors')),
            "barcode" => 'nullable|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $goods = Goods::where(['id' => request('goods_id')])->first();

        $item = null;

        try {

            if ($found) {
                $item = Item::where(['id' => request('id')])
                    ->update([
                        // 'goods_id' => request('goods_id'),
                        'cup' => $goods->type === 'BR' ? request('cup') : null,
                        'size' => request('size'),
                        'color' => request('color'),
                        'barcode' => request('barcode'),
                    ]);
                $item = Item::where(['id' => request('id')])->first();

            }

            $item = Item::create([
                'goods_id' => request('goods_id'),
                'cup' => $goods->type === 'BR' ? request('cup') : null,
                'size' => request('size'),
                'color' => request('color'),
                'barcode' => request('barcode'),
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $resource = new ItemResource($item);
        $response = config('response.common.success');
        $response['data'] = $resource->resolve();
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "goods_id" => 'required|string',
            "cup" => 'nullable|string|in:' . implode(',', config('constant.goods.cups')),
            "size" => 'nullable|string|in:' . implode(',', config('constant.goods.sizes')),
            "color" => 'nullable|string|in:' . implode(',', config('constant.goods.colors')),
            "barcode" => 'nullable|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $item = null;
        $user = Auth::user();

        $exists = Item::where([
            'id' => request('id'),
        ])->first();

        if (!$exists) {
            $item = Item::where([
                'goods_id' => request('goods_id'),
                'cup' => request('cup'),
                'size' => request('size'),
                'color' => request('color'),
            ])->first();

            if ($item) {
                $resource = new ItemResource($item);
                $response = config('response.goods.fail.item.exists');
                $response['data'] = $resource->resolve();
                return response()->json($response, 400);
            }
        }

        try {
            $found = false;
            $goods = Goods::where(['id' => request('goods_id')])->first();

            if ($request->filled(['id'])) {
                $found = Item::where(['id' => request('id')])->first();
            }
            if ($found) {
                Item::where(['id' => request('id')])
                    ->update([
                        // 'goods_id' => request('goods_id'),
                        'cup' => $goods->type === 'BR' ? request('cup') : null,
                        'size' => request('size'),
                        'color' => request('color'),
                        'barcode' => request('barcode'),
                    ]);
                $item = Item::where(['id' => request('id')])->first();
                // dd(request('id'), $item);
                // $resource = new ItemResource($item);
                // $response = config('response.common.success');
                // $response['data'] = $resource->resolve();
                // return response()->json($response, 200);
            } else {
                $item = Item::create([
                    'goods_id' => request('goods_id'),
                    'cup' => $goods->type === 'BR' ? request('cup') : null,
                    'size' => request('size'),
                    'color' => request('color'),
                    'barcode' => $request->filled(['barcode']) ? request('barcode') : GoodsLib::barcode(),
                    'created_by' => $user->id,
                ]);
                // $resource = new ItemResource($item);
                // $response = config('response.common.success');
                // $response['data'] = $resource->resolve();
                // return response()->json($response, 200);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        // $results = Item::where(['goods_id' => $item->goods_id])
        //     ->orderBy('cup', 'ASC')
        //     ->orderBy('color', 'ASC')
        //     ->orderBy('size', 'ASC')
        //     ->get();
        $resource = new ItemResource($item);
        $response = config('response.common.success');
        $response['data'] = $resource->resolve();
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

        // check item exists
        $item = Item::where(['id' => request('id')])->first();
        if (!$item) {
            $response = config('response.common.fail.data');
            return response()->json($response, 400);
        }

        // check stock taken exists
        $stockTakenUnit = PurchaseStockTake::where('goods_item_id', $item->id)->get()->sum('unit');
        if ($stockTakenUnit > 0) {
            $response = config('response.goods.fail.item.delete.purchase');
            return response()->json($response, 400);
        }

        // check purchase item exists
        $purchaseItemCount = PurchaseItem::where('goods_item_id', $item->id)->get()->count();
        if ($purchaseItemCount > 0) {
            $response = config('response.goods.fail.item.delete.stock');
            return response()->json($response, 400);
        }

        try {
            Item::where(['id' => request('id')])->delete();
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        $response['data'] = Item::where(['goods_id' => $item->goods_id])->get();
        return response()->json($response, 200);
    }

    public function get(Request $request)
    {

        $query = Item::with(['goods'])
            ->when($request->filled(['item_ids']), function ($query) {
                $itemIDs = request('item_ids');
                return $query->where(function ($query) use ($itemIDs) {
                    $query->whereIn('id', $itemIDs);
                });
            })
            ->when($request->filled(['goods_id']), function ($query) {
                $goods_id = trim(request('goods_id'));
                return $query->where(function ($query) use ($goods_id) {
                    $query->where('goods_id', $goods_id);
                });
            })
            ->when($request->filled(['goods_ids']), function ($query) {
                $goodsIDs = request('goods_ids');
                return $query->where(function ($query) use ($goodsIDs) {
                    $query->whereIn('goods_id', $goodsIDs);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_id', 'like', '%' . $keyword . '%')
                        ->orWhere('cup', 'like', '%' . $keyword . '%')
                        ->orWhere('color', 'like', '%' . $keyword . '%')
                        ->orWhere('size', 'like', '%' . $keyword . '%')
                        ->orWhere('barcode', 'like', '%' . $keyword . '%');
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

        $goods = Goods::where(['id' => request('goods_id')])->first();
        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $resource = new ItemsResource($result);
            $response['data'] = [
                'headers' => GoodsLib::itemHeaders($goods->type),
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
            'id' => 'required_without:barcode|string',
            'barcode' => 'required_without:id|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $data = Item::with(['goods'])
            ->where(['id' => request('id')])
            ->orWhere(['barcode' => request('barcode')])
            ->first();

        if (!$data) {
            $response = config('response.common.fail.data');
            return response()->json($response, 400);
        }

        $resource = new ItemResource($data);
        $response = config('response.common.success');
        $response['data'] = $resource->resolve();
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        $query = Item::with(['goods'])
            ->when($request->filled(['goods_id']), function ($query) {
                $goods_id = trim(request('goods_id'));
                return $query->where(function ($query) use ($goods_id) {
                    $query->where('goods_id', $goods_id);
                });
            })
            ->when($request->filled(['goods_ids']), function ($query) {
                $goodsIDs = request('goods_ids');
                return $query->where(function ($query) use ($goodsIDs) {
                    $query->whereIn('goods_id', $goodsIDs);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_id', 'like', '%' . $keyword . '%')
                        ->orWhere('cup', 'like', '%' . $keyword . '%')
                        ->orWhere('color', 'like', '%' . $keyword . '%')
                        ->orWhere('size', 'like', '%' . $keyword . '%')
                        ->orWhere('barcode', 'like', '%' . $keyword . '%');
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
            __('Cup'),
            __('Size'),
            __('Color'),
            __('Barcode'),
            __('Updated at'),
        ];
        $rows = [];
        foreach ($result->toArray() as $item) {
            $row = [
                $item['cup'],
                $item['size'],
                $item['color'],
                $item['barcode'],
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Goods Item'), $rows, $headers, request('extension'));

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}
