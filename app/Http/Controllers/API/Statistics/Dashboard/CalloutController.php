<?php

namespace App\Http\Controllers\API\Statistics\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Goods\Category;
use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use App\Models\Goods\Supplier;
use Illuminate\Http\Request;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CalloutController extends Controller
{
    //
    public function get(Request $request) {
        $goods = Goods::get();
        $items = Item::get();
        $suppliers = Supplier::get();
        $categories = Category::get();
        // $data = new stdClass();
        // $data = $goods->count();
        $data = [
            'goods' => [
            'count' => $goods->count(),
            'supplier' => [
                'count' => $suppliers->count(),
            ],
                    'category' => [
                        'count' => $categories->count(),
                    ],
                    'item' => [
                        'count' => $items->count(),
                    ],
                ],
            ];
        $response = config('response.common.success');
        $response['data'] = $data;
        return response()->json($response, 200);
    }
}