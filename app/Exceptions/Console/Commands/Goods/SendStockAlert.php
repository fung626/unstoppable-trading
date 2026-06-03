<?php

namespace App\Console\Commands\Goods;

use App\Mail\StockAlert;
use App\Models\Goods\Goods;
use App\Models\Goods\Stock\Stock;
use App\Models\User\Users;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendStockAlert extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stock:alert';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send goods stock alert';

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
        $result = Goods::with(['items'])
            ->where('stock_alert', '>', 0)
            ->get();
        $data = [];
        $to = [];
        foreach ($result as $goods) {
            $items = $goods->items;
            foreach ($items as $item) {
                $stock = Stock::goodsItemSum($item->id);
                $stockUnit = isset($stock) ? $stock->unit : 0;
                if ($stockUnit < $goods->stock_alert) {
                    $temp = $item->toArray();
                    $temp['name'] = $goods->name;
                    $temp['type'] = $goods->type;
                    $temp['stock_unit'] = $stockUnit;
                    // dd($temp);
                    $data[] = $temp;
                }
            }
        }

        $users = Users::where(['role' => 'admin'])->get();
        if (count($data) > 0) {
            foreach ($users as $user) {
                $to[] = ['email' => $user->email, 'name' => $user->name ? $user->name : $user->email];
            }
            // dd($data, $to);
            try {
                Mail::to($to)->locale('tc')->send(new StockAlert($data));
            } catch (\Exception $e) {
                Log::error($e->getMessage());
            }
        }

        return 0;
    }
}
