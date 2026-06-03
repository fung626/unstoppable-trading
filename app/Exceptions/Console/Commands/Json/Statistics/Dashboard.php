<?php

namespace App\Console\Commands\Json\Statistics;

use App\Models\Goods\Category;
use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use App\Models\Goods\Supplier;
use File;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class Dashboard extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'json:dashboard';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        try {
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

            File::put(env('REACT_PATH') . 'src/json/statistics/dashboard.json', json_encode($data));
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        return 0;
    }
}