<?php
namespace App\Services\Shopify;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

abstract class ShopifyBaseService
{
    protected string $domain;
    protected string $clientId;
    protected string $clientSecret;
    protected string $version;

    protected array $options = [
        ['name' => '罩杯尺寸'],
        ['name' => '顏色'],
        ['name' => '尺寸類型'],
    ];

    public function __construct()
    {
        $this->domain = config('services.shopify.shop_domain');
        $this->clientId = config('services.shopify.client_id');
        $this->clientSecret = config('services.shopify.client_secret');
        $this->version = config('services.shopify.version', '2026-07');
    }

    /**
     * Get a valid Access Token (cached for 23 hours to prevent unnecessary API hits)
     */
    public function getAccessToken(): string
    {
        return Cache::remember('shopify_access_token', now()->addHours(23), function () {
            $response = Http::asForm()->post("https://{$this->domain}/admin/oauth/access_token", [
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'grant_type' => 'client_credentials',
            ]);

            if ($response->successful()) {
                return $response->json('access_token');
            }

            throw new \Exception('Failed to retrieve Shopify Access Token: ' . $response->body());
        });
    }

    /**
     * Helper to return a pre-configured HTTP client with authentication and headers
     */
    protected function client()
    {
        return Http::withHeaders([
            'X-Shopify-Access-Token' => $this->getAccessToken(),
            'Content-Type' => 'application/json',
        ]);
    }
}