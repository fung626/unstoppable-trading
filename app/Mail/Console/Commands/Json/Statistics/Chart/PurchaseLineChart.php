<?php

namespace App\Console\Commands\Json\Statistics\Chart;

use App\Models\Goods\Purchase\Purchase;
use App\Mylibs\Common;
use App\Mylibs\Statistics;
use File;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PurchaseLineChart extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chart:purchaseline';

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
            $result = Purchase::select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(created_at) AS count '))
                ->groupBy(DB::raw('year, month'))
                ->orderBy(DB::raw('year, month'))
                ->get();
            $max = 0;
            $min = 0;
            foreach ($result as $item) {
                $max = max([$max, $item->count]);
                $min = max([$min, $item->count]);
            }
            $max = $max + ($max * 0.1);
            $tick = 10;
            // $tick = Statistics::tickSize($max, $min);
            $data = [
                'labels' => Statistics::monthlyLabels(),
                'max' => Common::roundUpToAny($max, $tick),
                'stepSize' => Common::roundUpToAny($max / $tick, $max),
                'maxTicksLimit' => $tick,
                'datasets' => [
                    [
                        'data' => Statistics::renderMonthlyData($result),
                        'borderColor' => '#4dbd74',
                        'pointHoverBackgroundColor' => '#fff',
                        'label' => '訂單',
                    ],
                ],
            ];

            File::put(env('REACT_PATH') . 'src/json/statistics/chart/purchaseline.json', json_encode($data));
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        return 0;
    }
}