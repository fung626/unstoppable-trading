<?php // Code within app\Helpers\Helper.php

namespace App\Mylibs;

use App\Models\Goods\Category;
use App\Models\Goods\Content;
use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use App\Models\Goods\Supplier;
use App\Models\User\Users;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TestingData
{

    public static function generateGoods($length = 10)
    {

        $colors = [
            'Blue',
            'Red',
            'Black',
            'Green',
            'Yellow',
            'Pink',
            'Brown',
            'Orange',
            'Purple',
        ];

        $cupSizes = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
        ];

        $user = Users::inRandomOrder()->first();

        for ($i = 0; $i < $length; $i++) {

            DB::transaction(function () use ($user, $colors, $cupSizes) {

                $supplier = Supplier::inRandomOrder()->first();
                $categories = Category::select(['id'])->inRandomOrder()->limit(rand(1, 3))->get();
                $category_ids = Arr::flatten($categories->toArray());

                $goods = Goods::create([
                    'name' => 'Good ' . Str::random(6),
                    'type' => rand(0, 100) % 2 == 0 ? 'BR' : 'BF',
                    'description' => Str::random(26),
                    'supplier_id' => $supplier->id,
                    'categories' => $category_ids,
                    'created_by' => $user->id,
                ]);

                for ($x = 0; $x < rand(1, 4); $x++) {
                    Item::create([
                        'goods_id' => $goods->id,
                        'barcode' => Str::random(6),
                        'size' => rand(0, 4),
                        'cup' => $goods->type == 'BR' ? Arr::random($cupSizes) : null,
                        'color' => Arr::random($colors),
                        'created_by' => $user->id,
                    ]);
                }

                for ($x = 0; $x < rand(1, 4); $x++) {
                    Content::create([
                        'goods_id' => $goods->id,
                        'key' => Str::random(4),
                        'value' => Str::random(4),
                        'created_by' => $user->id,
                    ]);
                }

            });
        }

    }

}