<?php

namespace App\Providers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (config('cache.default') === 'file') {
            $cachePath = (string) config('cache.stores.file.path', storage_path('framework/cache/data'));
            if (!File::exists($cachePath)) {
                try {
                    File::makeDirectory($cachePath, 0755, true, true);
                } catch (\Throwable $e) {
                    Log::error('Unable to create cache directory: ' . $cachePath . ' - ' . $e->getMessage());
                }
            }
        }
        date_default_timezone_set('Asia/Hong_Kong');
    }
}