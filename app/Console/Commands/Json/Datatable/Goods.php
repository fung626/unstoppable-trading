<?php

namespace App\Console\Commands\Json\Datatable;

use App\Models\Goods\Goods as GoodsModel;
use File;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class Goods extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'json:goods';

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
            $goods = GoodsModel::with([
                'supplier',
                'categories',
                'creator',
            ])->get();
            File::put(env('REACT_PATH') . 'src/json/datatable/goods.json', $goods);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        return 0;
    }
}