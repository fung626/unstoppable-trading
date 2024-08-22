<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Passport::loadKeysFrom(__DIR__ . '/../secrets/oauth');

        Passport::tokensCan([
            'users' => 'Create/Review/Edit User',
            'goods' => 'Create/Review/Edit Goods',
            'stocks' => 'Create/Review/Edit Stock',
            'clients' => 'Create/Review/Edit Client',
            'categories' => 'Create/Review/Edit Category',
            'purchases' => 'Create/Review/Edit Purchase',
            'shippings' => 'Create/Review/Edit Shipping',
            'suppliers' => 'Create/Review/Edit Supplier',
            'warehouses' => 'Create/Review/Edit Warehouse',
            'sales-reports' => 'Review Sales Report',
        ]);

        ResetPassword::createUrlUsing(function ($user, string $token) {
            return env('APP_URL') . '#/auth/forgotpassword/reset/' . $user->id . '/' . $token;
        });

        if (Str::contains(request()->path(), ['auth/password'])) {
            Passport::tokensExpireIn(now()->addHours(1));
            // Passport::refreshTokensExpireIn(now()->addHours(1));
            Passport::personalAccessTokensExpireIn(now()->addHours(1));
        } else {
            Passport::tokensExpireIn(now()->addDays(30));
            // Passport::refreshTokensExpireIn(now()->addDays(30));
            Passport::personalAccessTokensExpireIn(now()->addDays(30));
        }
    }
}
