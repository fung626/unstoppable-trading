<?php
namespace App\Services\Shopify;

use Illuminate\Support\Facades\Cache;

class ShopifyLocationService extends ShopifyBaseService
{

    /**
     * Get all locations from Shopify (cached for 24 hours)
     */
    public function all(): array
    {
        return Cache::remember('shopify_locations', now()->addDay(), function () {
            $response = $this->client()->get("https://{$this->domain}/admin/api/{$this->version}/locations.json");
            if ($response->successful()) {
                return $response->json('locations') ?? [];
            }
            throw new \Exception('Failed to retrieve Shopify Locations: ' . $response->body());
        });
    }

    /**
     * Get the primary/default location ID
     */
    public function getDefaultId(): int
    {
        return Cache::remember('shopify_default_location_id', now()->addDay(), function () {
            $locations = $this->all();
            if (!empty($locations)) {
                // Grabs the first active location ID
                return $locations[0]['id'];
            }
            throw new \Exception('No Shopify locations found for this store.');
        });
    }

}