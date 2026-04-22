<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Stocks as StocksCollection;
use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use App\Mylibs\MyPhpOffice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    //

    protected $withs = [
        'goods.supplier',
        'goods',
    ];

    public function get(Request $request)
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
                return $query->where('goods.code', $keyword);
                // return $query->where('goods.code', 'like', '%' . $keyword . '%');
                // return $query->where(function ($query) use ($keyword) {
                //     $query->where('goods_items.id', 'like', '%' . $keyword . '%')
                //         ->orWhere('goods_items.cup', 'like', '%' . $keyword . '%')
                //         ->orWhere('goods_items.size', 'like', '%' . $keyword . '%')
                //         ->orWhere('goods_items.color', 'like', '%' . $keyword . '%')
                //         ->orWhere('goods_items.barcode', 'like', '%' . $keyword . '%');
                // })->orWhereHas('goods', function ($query) use ($keyword) {
                //     $query->where('goods.id', 'like', '%' . $keyword . '%')
                //         ->orWhere('goods.number', 'like', '%' . $keyword . '%')
                //         ->orWhere('goods.name', 'like', '%' . $keyword . '%')
                //         ->orWhere('goods.code', 'like', '%' . $keyword . '%')
                //         ->orWhere('goods.type', 'like', '%' . $keyword . '%');
                // });
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
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            // Log::debug($result);
            $resource = new StocksCollection($result);
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

    public function export(Request $request)
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

        $headers = [];
        foreach ($sizes as $key => $size) {
            if ($key === 0) {
                $headers[] = __('Name');
                $headers[] = __('Type');
                $headers[] = __('Cup');
                $headers[] = __('Color');
            }
            $headers[] = $size;
            if ($key === count($sizes) - 1) {
                $headers[] = __('Total Unit');
            }
        }
        $rows = [];

        $result = $query->get();
        $resource = new StocksCollection($result);
        $resource = $resource->resolve();

        foreach ($resource as $item) {
            $row = [];
            foreach ($sizes as $key => $size) {
                if ($key === 0) {
                    $row[] = $item['goods']['name'];
                    $row[] = $item['goods']['type'];
                    $row[] = $item['cup'];
                    $row[] = $item['color'];
                }
                $row[] = isset($item[$size]) ? $item[$size]['stock_unit'] : '－';
                if ($key === count($sizes) - 1) {
                    $row[] = $item['total_unit'];
                }
            }
            $rows[] = $row;
        }

        // Log::debug($rows);
        // Log::debug($headers);

        $path = MyPhpOffice::exportTableWithPath(__('Stock'), $rows, $headers, 'pdf');

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);

    }

}