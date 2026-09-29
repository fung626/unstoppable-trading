<?php
namespace App\Services\Shopify;

use Exception;

class ShopifyProductGraphQLService extends ShopifyBaseGraphQLService
{

    /**
     * Fetch all products with pagination support
     */
    public function all(): array
    {
        $products = [];
        $hasNextPage = true;
        $cursor = null;

        while ($hasNextPage) {
            $query = <<<'GRAPHQL'
            query($cursor: String) {
              products(first: 250, after: $cursor) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  id
                  title
                  createdAt
                }
              }
            }
            GRAPHQL;

            $response = $this->query($query, ['cursor' => $cursor]);
            $data = $response['data']['products'] ?? [];

            foreach ($data['nodes'] ?? [] as $node) {
                $products[] = $node;
            }

            $hasNextPage = $data['pageInfo']['hasNextPage'] ?? false;
            $cursor = $data['pageInfo']['endCursor'] ?? null;
        }

        return $products;
    }

    /**
     * Save a product and all its variants, returning product GID and all variant details.
     */
    public function save(array $baseInput, array $allVariants, ?string $productGid = null): array
    {
        $chunks = array_chunk($allVariants, 100);
        $firstChunk = array_shift($chunks);

        $baseInput['variants'] = $firstChunk;
        $productResult = $this->set($baseInput, $productGid);

        $resolvedGid = $productResult['id'] ?? null;
        if (!$resolvedGid) {
            throw new Exception("Failed to resolve product GID from GraphQL response.");
        }

        $allCreatedVariants = $productResult['variants'] ?? [];

        foreach ($chunks as $variantChunk) {
            $bulkVariants = $this->bulkCreate($resolvedGid, $variantChunk);
            $allCreatedVariants = array_merge($allCreatedVariants, $bulkVariants);
        }

        return [
            'product_gid' => $resolvedGid,
            'variants' => $allCreatedVariants,
        ];
    }

    public function set(array $input, ?string $productGid = null): array
    {
        $mutation = <<<'GRAPHQL'
        mutation productSet($input: ProductSetInput!, $identifier: ProductSetIdentifiers) {
          productSet(input: $input, identifier: $identifier) {
            product {
              id
              variants(first: 250) {
                nodes {
                  id
                  sku
                  inventoryItem {
                    id
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
        GRAPHQL;

        $variables = ['input' => $input];
        if ($productGid) {
            $variables['identifier'] = ['id' => $productGid];
        }

        $response = $this->query($mutation, $variables);

        $userErrors = $response['data']['productSet']['userErrors'] ?? [];
        if (!empty($userErrors)) {
            $formattedErrors = collect($userErrors)->map(function ($err) {
                $field = is_array($err['field']) ? implode('.', $err['field']) : ($err['field'] ?? 'unknown');
                return "{$field}: {$err['message']}";
            })->implode(', ');

            throw new Exception("Shopify ProductSet User Error: {$formattedErrors}");
        }

        $product = $response['data']['productSet']['product'] ?? [];
        return [
            'id' => $product['id'] ?? null,
            'variants' => $product['variants']['nodes'] ?? [],
        ];
    }

    public function bulkCreate(string $productGid, array $variants): array
    {
        $formattedVariants = collect($variants)->map(function ($v) {
            return [
                'price' => $v['price'],
                'optionValues' => $v['optionValues'] ?? [],
                'inventoryItem' => [
                    'sku' => $v['sku'] ?? null,
                    'tracked' => true,
                ],
                'inventoryQuantities' => collect($v['inventoryQuantities'] ?? [])->map(function ($iq) {
                    return [
                        'locationId' => $iq['locationId'],
                        'availableQuantity' => (int) ($iq['quantity'] ?? 0),
                    ];
                })->all(),
            ];
        })->all();

        $mutation = <<<'GRAPHQL'
        mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
          productVariantsBulkCreate(productId: $productId, variants: $variants) {
            product {
              id
            }
            productVariants {
              id
              sku
              inventoryItem {
                id
              }
              selectedOptions {
                name
                value
              }
            }
            userErrors {
              field
              message
            }
          }
        }
        GRAPHQL;

        $response = $this->query($mutation, [
            'productId' => $productGid,
            'variants' => $formattedVariants,
        ]);

        $userErrors = $response['data']['productVariantsBulkCreate']['userErrors'] ?? [];
        if (!empty($userErrors)) {
            $formattedErrors = collect($userErrors)->map(function ($err) {
                $field = is_array($err['field']) ? implode('.', $err['field']) : ($err['field'] ?? 'unknown');
                return "{$field}: {$err['message']}";
            })->implode(', ');

            throw new Exception("Shopify ProductVariantsBulkCreate User Error: {$formattedErrors}");
        }

        return $response['data']['productVariantsBulkCreate']['productVariants'] ?? [];
    }

    /**
     * Delete a product by its Global ID.
     */
    public function delete(string $productGid): void
    {
        $mutation = <<<'GRAPHQL'
        mutation productDelete($input: ProductDeleteInput!) {
          productDelete(input: $input) {
            deletedProductId
            userErrors {
              field
              message
            }
          }
        }
        GRAPHQL;

        $response = $this->query($mutation, [
            'input' => ['id' => $productGid],
        ]);

        $errors = $response['data']['productDelete']['userErrors'] ?? [];
        if (!empty($errors)) {
            $errorMsg = collect($errors)->map(fn($e) => $e['message'])->implode(', ');
            throw new \Exception("Failed to delete product {$productGid}: {$errorMsg}");
        }
    }

    /**
     * Fetch all products from Shopify with their variants and options for mapping.
     */
    public function allWithVariants(): array
    {
        $products = [];
        $hasNextPage = true;
        $cursor = null;

        while ($hasNextPage) {
            $query = <<<'GRAPHQL'
            query($cursor: String) {
              products(first: 250, after: $cursor) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  id
                  title
                  variants(first: 250) {
                    nodes {
                      id
                      sku
                      inventoryItem {
                        id
                      }
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
              }
            }
            GRAPHQL;

            $response = $this->query($query, ['cursor' => $cursor]);
            $productData = $response['data']['products'] ?? [];

            foreach ($productData['nodes'] ?? [] as $node) {
                $products[] = $node;
            }

            $hasNextPage = $productData['pageInfo']['hasNextPage'] ?? false;
            $cursor = $productData['pageInfo']['endCursor'] ?? null;
        }

        return $products;
    }
}