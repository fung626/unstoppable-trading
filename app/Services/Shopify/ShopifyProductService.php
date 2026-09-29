<?php
namespace App\Services\Shopify;

class ShopifyProductService extends ShopifyBaseService
{
    /**
     * Retrieve a single product by its ID from Shopify
     */
    public function get(string $pid)
    {
        $response = $this->client()->get("https://{$this->domain}/admin/api/{$this->version}/products/{$pid}.json");
        return $response->json();
    }

    /**
     * Create a goods item in Shopify
     */
    public function create(array $data)
    {
        $response = $this->client()->post("https://{$this->domain}/admin/api/{$this->version}/products.json", [
            'product' => [
                'title' => $data['title'],
                'body_html' => $data['description'] ?? null,
                'vendor' => $data['vendor'],
                'product_type' => $data['product_type'] ?? null,
                'options' => $this->options,
                'variants' => $data['variants'],
            ],
        ]);

        return $response->json();
    }

    public function update(string $pid, array $data)
    {
        $response = $this->client()->put("https://{$this->domain}/admin/api/{$this->version}/products/{$pid}.json", [
            'product' => array_merge(['id' => $pid], $data),
        ]);
        return $response->json();
    }

    /**
     * Retrieve a single product by its ID from Shopify
     */
    public function getVariants(string $pid)
    {
        $token = $this->getAccessToken();
        $response = $this->client()->get("https://{$this->domain}/admin/api/{$this->version}/products/{$pid}/variants.json");
        return $response->json();
    }
}