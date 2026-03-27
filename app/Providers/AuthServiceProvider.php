<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();

        Passport::tokensCan([
            'user' => 'Create/Review/Edit User',
            'duty' => 'Create/Review/Edit Duty',
            'leave' => 'Create/Review/Edit Leave',
            'goods' => 'Create/Review/Edit Goods',
            'stock' => 'Create/Review/Edit Stock',
            'stocktake' => 'Create/Review/Edit Stock Take',
            'client' => 'Create/Review/Edit Client',
            'category' => 'Create/Review/Edit Category',
            'purchase' => 'Create/Review/Edit Purchase',
            'shipping' => 'Create/Review/Edit Shipping',
            'supplier' => 'Create/Review/Edit Supplier',
            'warehouse' => 'Create/Review/Edit Warehouse',
            'salesreport' => 'Review Sales Report',
        ]);

        ResetPassword::createUrlUsing(function ($user, string $token) {
            return env('APP_URL') . 'auth/forgot/password/reset/' . $user->id . '/' . $token;
        });

        //
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