<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Warehouse\Warehouse as WarehouseResource;
use App\Http\Resources\Goods\Warehouse\Warehouses as WarehousesResource;
use App\Models\Goods\Warehouse\Warehouse;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Validator;

class WarehouseController extends Controller
{
    //
    protected $withs = [
        'goods',
    ];

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sector' => 'required|string',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {

            Warehouse::create([
                'sector' => request('sector'),
                'shelf' => request('shelf'),
                'segment' => request('segment'),
                'description' => request('description'),
            ]);

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
            'id' => 'required|string|exists:warehouses,id',
            'sector' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {

            Warehouse::where(['id' => request('id')])
                ->update([
                    'sector' => request('sector'),
                    'shelf' => request('shelf'),
                    'segment' => request('segment'),
                    'description' => request('description'),
                ]);

        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }
        $response = config('response.common.success');
        $response['data'] = Warehouse::where(['id' => request('id')])->first();
        return response()->json($response, 200);
    }

    public function get(Request $request)
    {
        // $page = $request->filled('page') ? request('page') : 1;
        // $perPage = $request->filled('per_page') ? request('per_page') : 10;
        $query = Warehouse::with($this->withs)
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('sector', 'like', '%' . $keyword . '%')
                        ->orWhere('shelf', 'like', '%' . $keyword . '%')
                        ->orWhere('segment', 'like', '%' . $keyword . '%');
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

        // if ($request->filled(['sort_by', 'sort_desc'])) {
        //     $sortBys = request('sort_by');
        //     $sortDescs = request('sort_desc');
        //     $index = 0;
        //     foreach ($sortBys as $sortBy) {
        //         $sortDesc = $sortDescs[$index];
        //         if ($sortBy !== "actions") {
        //             $query->orderBy($sortBy, $sortDesc ? 'DESC' : 'ASC');
        //         }
        //         $index++;
        //     }
        // }

        $response = config('response.common.success');
        if ($request->filled(['per_page', 'page'])) {
            $result = $query->paginate(request('per_page'), ['*'], 'page', request('page'));
            $resource = new WarehousesResource($result);
            $response['data'] = [
                'data' => $resource,
                'total' => $result->total(),
                'last_page' => $result->lastPage(),
                'current_page' => $result->currentPage(),
                'has_more_pages' => $result->hasMorePages(),
            ];
        } else {
            $result = $query->get();
            $resource = new WarehousesResource($result);
            $response['data'] = $resource;
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

        $result = Warehouse::select()->where(['id' => request('id')])->first();
        $resource = new WarehouseResource($result);
        $response = config('response.common.success');
        $response['data'] = $resource;
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

        $warehouse = Warehouse::where(['id' => request('id')])->delete();
        $response = config('response.common.success');
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        $query = Warehouse::select()
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('sector', 'like', '%' . $keyword . '%')
                        ->orWhere('shelf', 'like', '%' . $keyword . '%')
                        ->orWhere('segment', 'like', '%' . $keyword . '%');
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
            __('Sector'),
            __('Shelf'),
            __('Segment'),
            __('Stock Unit'),
            __('Description'),
            __('Created at'),
            __('Updated at'),
        ];
        $rows = [];
        $resource = new WarehousesResource($result);
        $resource = $resource->resolve();
        foreach ($resource as $item) {
            $row = [
                $item['sector'],
                $item['shelf'],
                $item['segment'],
                $item['stock_unit'],
                $item['description'],
                // implode(", ", $item['categories']),
                Carbon::parse($item['created_at'])->format('Y-m-d H:i:s'),
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Warehouse'), $rows, $headers, 'pdf');

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}
