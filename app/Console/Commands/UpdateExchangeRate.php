<?php

namespace App\Console\Commands;

use App\Models\ExchangeRates;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class UpdateExchangeRate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-exchange-rate {base}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'update exchange rate';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        try {
            $path = env('FOREX_API') . '/' . $this->argument('base');
            $response = Http::get($path);
            $json = $response->json();
            if (isset($json['result']) == "success") {
                // dd($json["base_code"], $json["conversion_rates"]);
                foreach ($json["conversion_rates"] as $key => $item) {
                    // dd($key);
                    ExchangeRates::updateOrCreate([
                        'base' => $json["base_code"],
                        'symbol' => $key,
                    ], [
                        'rate' => $item,
                    ]);
                }
            }
        } catch (ProcessFailedException $exception) {
            Log::error($exception->getMessage());
        }

    }
}
