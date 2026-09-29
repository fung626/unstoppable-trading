<?php
namespace App\Services\Shopify;

class ShopifyOrderService extends ShopifyBaseService
{

    /**
     * Get recently updated orders from Shopify
     */
    public function get(array $data)
    {
        $data = array_merge($data, [
            'status' => 'any',
            'limit' => 50,
        ]);
        $response = $this->client()->get("https://{$this->domain}/admin/api/{$this->version}/orders.json", $data);
        return $response->json('orders', []);
    }

}