<?php
namespace App\Services\Shopify;

use Exception;
use Illuminate\Support\Facades\Log;

class ShopifyBaseGraphQLService extends ShopifyBaseService
{
    protected string $endpoint;

    public function __construct()
    {
        parent::__construct();
        $this->endpoint = "https://{$this->domain}/admin/api/{$this->version}/graphql.json";
    }

    /**
     * Send a raw GraphQL query or mutation to Shopify.
     */
    public function query(string $query, array $variables = []): array
    {
        try {
            // Use client() to automatically inject the cached OAuth access token
            $response = $this->client()->post($this->endpoint, [
                'query' => $query,
                'variables' => $variables,
            ]);

            if ($response->failed()) {
                throw new Exception("HTTP Error: " . $response->status() . " - " . $response->body());
            }

            $result = $response->json();

            if (isset($result['errors'])) {
                $errorMessages = collect($result['errors'])->pluck('message')->implode(', ');
                throw new Exception("Shopify GraphQL Protocol Error: {$errorMessages}");
            }

            return $result;

        } catch (Exception $e) {
            Log::error("Shopify GraphQL Service Exception: " . $e->getMessage());
            throw $e;
        }
    }
}