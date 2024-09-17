<?php

namespace App\Http\Controllers\API\Goods\Shipping;

use App\Http\Controllers\Controller;
use App\Models\Goods\Shipping\Alteration as ShipAlteration;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AlterationController extends Controller
{
    //
    protected $withs = [
        'item',
        'item.goods',
    ];

    public function get(Request $request)
    {
        $query = ShipAlteration::with($this->withs)
            ->when($request->filled(['id']), function ($query) {
                $id = trim(request('id'));
                return $query->where(function ($query) use ($id) {
                    $query->where('id', $id);
                });
            })
            ->when($request->filled(['goods_shipping_id']), function ($query) {
                $goodsShipId = trim(request('goods_shipping_id'));
                return $query->where(function ($query) use ($goodsShipId) {
                    $query->where('goods_shipping_id', $goodsShipId);
                });
            })
            ->when($request->filled(['goods_stock_id']), function ($query) {
                $goodsStockId = trim(request('goods_stock_id'));
                return $query->where(function ($query) use ($goodsStockId) {
                    $query->where('goods_stock_id', $goodsStockId);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('type', 'like', '%' . $keyword . '%');
                });
            });

        if ($request->filled(['sort_by'])) {
            $sortBys = request('sort_by');
            foreach ($sortBys as $sortBy) {
                if ($sortBy["key"] && $sortBy["order"]) {
                    $query->orderBy($sortBy["key"], $sortBy["order"]);
                }
            }
        }

        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $array = $result->toArray();
            // $resource = new ShipsResource($result);
            $response['data'] = [
                'data' => $array['data'],
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

    public function export(Request $request)
    {

        $query = ShipAlteration::with($this->withs)
            ->when($request->filled(['id']), function ($query) {
                $id = trim(request('id'));
                return $query->where(function ($query) use ($id) {
                    $query->where('id', $id);
                });
            })
            ->when($request->filled(['goods_shipping_id']), function ($query) {
                $goodsShipId = trim(request('goods_shipping_id'));
                return $query->where(function ($query) use ($goodsShipId) {
                    $query->where('goods_shipping_id', $goodsShipId);
                });
            })
            ->when($request->filled(['goods_stock_id']), function ($query) {
                $goodsStockId = trim(request('goods_stock_id'));
                return $query->where(function ($query) use ($goodsStockId) {
                    $query->where('goods_stock_id', $goodsStockId);
                });
            })
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('type', 'like', '%' . $keyword . '%');
                });
            });

        if ($request->filled(['sort_by'])) {
            $sortBys = request('sort_by');
            foreach ($sortBys as $sortBy) {
                if ($sortBy["key"] && $sortBy["order"]) {
                    $query->orderBy($sortBy["key"], $sortBy["order"]);
                }
            }
        }

        $result = $query->get();
        $headers = [
            __('Name'),
            __('Type'),
            __('Size'),
            __('Color'),
            __('Unit'),
            __('Altered Unit'),
            __('Created at'),
            __('Updated at'),
        ];
        $rows = [];
        $array = $result->toArray();
        foreach ($array as $item) {
            $row = [
                $item['item']['goods']['name'],
                $item['item']['goods']['type'],
                $item['item']['size'],
                $item['item']['color'],
                $item['unit'],
                $item['altered_unit'],
                Carbon::parse($item['created_at'])->format('Y-m-d H:i:s'),
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath('altered', $rows, $headers, 'pdf');

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}
