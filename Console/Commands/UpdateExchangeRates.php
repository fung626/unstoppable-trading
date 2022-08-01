<?php

namespace App\Console\Commands;

use App\Models\ExchangeRates;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class UpdateExchangeRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:exchangerate {q}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Exchange Rates';

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
        $data = ['apiKey' => env('CURRCONV_KEY'), 'q' => $this->argument('q')];
        $path = env('CURRCONV') . '?' . http_build_query($data);
        $response = Http::get($path);
        $response = $response->json();
        if (isset($response['results'])) {
            $result = $response['results'];
            foreach ($result as $key => $item) {
                // dd($key);
                ExchangeRates::updateOrCreate([
                    'base' => $item['fr'],
                    'symbol' => $item['to'],
                ], [
                    'rate' => $item['val'],
                ]);
            }
        }
        return 0;
    }
}
