<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Stocks as StocksCollection;
use App\Models\Config\UserRole;
use App\Models\Goods\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TestController extends Controller
{
    //
    protected $withs = [
        'goods.suppliers',
        'goods',
    ];

    public function get(Request $request)
    {
        $response = config('response.common.success');
        try {
            // $array = array(
            //     "users" => true,
            //     "goods" => true,
            //     "stocks" => true,
            //     "clients" => true,
            //     "categories" => true,
            //     "purchases" => true,
            //     "shippings" => true,
            //     "suppliers" => true,
            //     "warehouses" => true,
            //     "sales-reports" => true,
            // );
            $data = UserRole::where([
                'name' => 'ADMIN',
            ])->get();
            $response['data'] = $data;
        } catch (\Exception $e) {
            dd($e->getMessage());
            Log::error($e->getMessage());
            $response['msg'] = $e->getMessage();
            return response()->json($response, 200);
        }
        return response()->json($response, 200);
    }

    public function post(Request $request)
    {
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

        $query = Item::with($this->withs)
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('goods_items.id', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_items.cup', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_items.size', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_items.color', 'like', '%' . $keyword . '%')
                        ->orWhere('goods_items.barcode', 'like', '%' . $keyword . '%');
                })->orWhereHas('goods', function ($query) use ($keyword) {
                    $query->where('goods.id', 'like', '%' . $keyword . '%')
                        ->orWhere('goods.name', 'like', '%' . $keyword . '%')
                        ->orWhere('goods.type', 'like', '%' . $keyword . '%');
                });
            })
            ->select($select)
            ->join('goods', 'goods.id', '=', 'goods_items.goods_id')
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
            $query->orderBy('goods_items.updated_at', $sortDesc ? 'DESC' : 'ASC');
        }

        $response = config('response.common.success');
        // dd($request->all());
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            // Log::debug($result->toArray());
            $resource = new StocksCollection($result);
            dd($result->toArray(), $resource->resolve());
            $response['data'] = [
                'data' => $resource,
                'total' => $result->total(),
                'last_page' => $result->lastPage(),
                'current_page' => $result->currentPage(),
                'has_more_pages' => $result->hasMorePages(),
            ];
            // dd($response);
        } else {
            $result = $query->get();
            $resource = new StocksCollection($result);
            $response['data'] = $resource;
        }

        return response()->json($response, 200);
    }

}
