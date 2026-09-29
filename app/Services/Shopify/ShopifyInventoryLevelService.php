<?php
namespace App\Services\Shopify;

class ShopifyInventoryLevelService extends ShopifyBaseService
{

    protected ShopifyLocationService $locationService;

    public function __construct(ShopifyLocationService $locationService)
    {
        parent::__construct();
        $this->locationService = $locationService;
    }
    /**
     * Set the absolute inventory level for an inventory item at the default location
     */
    public function set(int $inventoryItemId, int $availableQuantity)
    {
        $token = $this->getAccessToken();
        $locationId = $this->locationService->getDefaultId();

        $response = $this->client()->post("https://{$this->domain}/admin/api/{$this->version}/inventory_levels/set.json", [
            'location_id' => $locationId,
            'inventory_item_id' => $inventoryItemId,
            'available' => $availableQuantity,
        ]);

        if (!$response->successful()) {
            throw new \Exception("Failed to set inventory level for item {$inventoryItemId}: " . $response->body());
        }

        return $response->json();
    }

}