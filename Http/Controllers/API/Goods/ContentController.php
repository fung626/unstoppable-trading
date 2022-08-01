<?php

namespace App\Http\Controllers\API\Goods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Goods\Content as ContentResource;
use App\Http\Resources\Goods\Contents as ContentsResource;
use App\Models\Goods\Content;
use App\Mylibs\MyPhpOffice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Validator;

class ContentController extends Controller
{
    //

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "goods_id" => 'required|string',
            "key" => 'nullable|string',
            "value" => 'nullable|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $content = null;

        try {
            $found = Content::where(['id' => request('id')])->first();
            if ($found) {
                Content::where(['id' => request('id')])
                    ->update([
                        'goods_id' => request('goods_id'),
                        'key' => request('key'),
                        'value' => request('value'),
                    ]);
                $content = Content::where(['id' => request('id')])->first();
            } else {
                $content = Content::create([
                    'goods_id' => request('goods_id'),
                    'key' => request('key'),
                    'value' => request('value'),
                ]);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        $response['data'] = new ContentResource($content);
        return response()->json($response, 200);
    }

    public function get(Request $request)
    {

        $query = Content::when($request->filled(['goods_id']), function ($query) {
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
                    $query->where('key', 'like', '%' . $keyword . '%')
                        ->orWhere('value', 'like', '%' . $keyword . '%');
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
            $resource = new ContentsResource($result);
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

        $content = Content::select()->where(['id' => request('id')])->first();

        $response = config('response.common.success');
        $response['data'] = $content;
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

        $content = Content::where(['id' => request('id')])->first();
        if (!$content) {
            $response = config('response.common.fail.data');
            return response()->json($response, 400);
        }

        try {
            Content::where(['id' => request('id')])->delete();
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e->getMessage());
            // $errorInfo = $e->errorInfo;
            $response = config('response.common.fail.database');
            $response['msg'] = $e->getMessage();
            return response()->json($response, 500);
        }

        $response = config('response.common.success');
        $response['data'] = Content::where(['goods_id' => $content->goods_id])->get();
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        $query = Content::when($request->filled(['goods_id']), function ($query) {
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
                    $query->where('key', 'like', '%' . $keyword . '%')
                        ->orWhere('value', 'like', '%' . $keyword . '%');
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
            __('Value'),
            __('Updated at'),
        ];
        $rows = [];
        foreach ($result->toArray() as $item) {
            $row = [
                $item['key'],
                $item['value'],
                Carbon::parse($item['updated_at'])->format('Y-m-d H:i:s'),
            ];
            $rows[] = $row;
        }

        $path = MyPhpOffice::exportTableWithPath(__('Goods Content'), $rows, $headers, request('extension'));

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}