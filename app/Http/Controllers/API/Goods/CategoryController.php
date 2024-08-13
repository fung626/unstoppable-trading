<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Categories as CategoriesResource;
use App\Models\Goods\Category;
use App\Models\Goods\Goods;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Validator;

class CategoryController extends Controller
{
    //
    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            // 'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            Category::create([
                'name' => request('name'),
                'description' => request('description'),
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|exists:categories,id',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {
            Category::where(['id' => request('id')])
                ->update([
                    'name' => request('name'),
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
        $response['data'] = Category::where(['id' => request('id')])->first();
        return response()->json($response, 200);
    }

    public function get(Request $request)
    {
        $query = Category::select()
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('name', 'like', '%' . $keyword . '%');
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
            $resource = new CategoriesResource($result);
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

        $category = Category::select()->where(['id' => request('id')])->first();
        $response = config('response.common.success');
        $response['data'] = $category;
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

        try {

            DB::transaction(function () {
                $goods = Goods::whereHas('categories', function ($query) {
                    return $query->where('id', request('id'));
                })->get();

                if ($goods) {
                    foreach ($goods as $_goods) {
                        $diff = array_diff($_goods->categories, [request('id')]);
                        Goods::where('id', $_goods->id)
                            ->update(['categories' => $diff]);
                    }
                }

                Category::where(['id' => request('id')])->delete();
            });

        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        $response['data'] = Category::get();
        return response()->json($response, 200);

    }

    public function export(Request $request)
    {
        $query = Category::select()
            ->when($request->filled(['search']), function ($query) {
                $keyword = trim(request('search'));
                return $query->where(function ($query) use ($keyword) {
                    $query->where('id', 'like', '%' . $keyword . '%')
                        ->orWhere('name', 'like', '%' . $keyword . '%');
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
            __('Description'),
            __('Updated at'),
        ];
        $rows = [];
        foreach ($result->toArray() as $item) {
            $row = [
                $item['name'],
                $item['description'],
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Category'), $rows, $headers, request('extension'));

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}
