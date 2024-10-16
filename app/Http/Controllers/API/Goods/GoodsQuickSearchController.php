<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class GoodsQuickSearchController extends Controller
{
    //
    protected $withs = [
        'goods.supplier',
        'goods',
    ];

    public function __construct()
    {
        DB::enableQueryLog();
    }

    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'required',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $query = Goods::when($request->filled(['search']), function ($query) {
            $keyword = trim(request('search'));
            return $query->where(function ($query) use ($keyword) {
                $query->where('id', 'like', '%' . $keyword . '%')
                    ->orWhere('name', 'like', '%' . $keyword . '%')
                    ->orWhere('type', 'like', '%' . $keyword . '%');
            });
        });

        $result = $query->get();
        $response = config('response.common.success');
        $response['data'] = $result;

        return response()->json($response, 200);
    }

    public function details(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'required',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        // $query = Goods::when($request->filled(['search']), function ($query) {
        //     $keyword = trim(request('search'));
        //     return $query->where(function ($query) use ($keyword) {
        //         $query->where('id', 'like', '%' . $keyword . '%')
        //             ->orWhere('name', 'like', '%' . $keyword . '%')
        //             ->orWhere('type', 'like', '%' . $keyword . '%');
        //     });
        // });

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

        $result = $query->get();
        $response = config('response.common.success');
        $response['data'] = $result;

        return response()->json($response, 200);
    }

}
