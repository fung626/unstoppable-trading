<?php
namespace App\Console\Commands\Shopify;

use App\Models\Goods\Goods;
use App\Models\Goods\Item;
use App\Models\Goods\Stock\Stock;
use App\Services\Shopify\ShopifyInventoryLevelService;
use App\Services\Shopify\ShopifyProductService;
use Illuminate\Console\Command;

class PushStocksToShopify extends Command
{
    protected $signature = 'shopify:push-stocks
        {--limit=3 : Number of limited goods to sync}
        {--code= : Specific goods code to sync}';
    protected $description = 'Sync stocks and inventory by aggregating all variants per goods code';

    public function handle(
        ShopifyProductService $productService,
        ShopifyInventoryLevelService $inventoryService
    ) {
        @ini_set('memory_limit', '512M');
        $limit = (int) $this->option('limit');
        $code = $this->option('code');
        $this->info("Checking for un-synced stock records...");

        $syncedCount = 0;

        $query = Stock::with(['goods.supplier', 'goods.items.stocks'])
            ->whereIn('type', ['PURCHASE', 'SHIPPING'])
            ->where(function ($q) {
                $q->where('synced_to_shopify', false)
                    ->orWhereNull('synced_to_shopify');
            });

        if ($code) {
            $query->whereHas('goods', function ($q) use ($code) {
                $q->where('code', $code);
            });
        }

        $stocks = $query->get();

        if ($stocks->isEmpty()) {
            $this->info('No un-synced stock records found.');
            return Command::SUCCESS;
        }

        $stocksByCode = $stocks->groupBy(function ($stock) {
            return $stock->goods?->code;
        })->filter(function ($group, $code) {
            return !empty($code);
        });

        if (!$code && $limit > 0) {
            $stocksByCode = $stocksByCode->take($limit);
        }

        foreach ($stocksByCode as $code => $group) {
            $goods = $group->map->goods->filter()->unique('id');
            if ($goods->isEmpty()) {
                continue;
            }
            $first = $goods->first();
            $this->info("Processing Product Code: {$code} | Type: " . ($first->type ?? 'NULL'));

            try {
                $shopifyProductId = $first->shopify_product_id;
                foreach ($goods as $g) {
                    if (!$shopifyProductId && $g->shopify_product_id) {
                        $shopifyProductId = $g->shopify_product_id;
                    }
                }
                $variants = [];
                $quantities = [];

                foreach ($goods as $g) {
                    foreach ($g->items as $item) {
                        $quantity = (int) $item->stocks->sum('unit');
                        $sku = $item->barcode ?? $code;
                        $quantities[$sku] = $quantity;
                        $variants[] = [
                            'price' => $item->retail_price ?? $g->retail_price,
                            'sku' => $sku,
                            'option1' => $item->cup ?? 'Default',
                            'option2' => $item->color ?? 'Default',
                            'option3' => $item->size ?? 'Default',
                            'inventory_management' => 'shopify',
                        ];
                        $this->info("Prepared variant for SKU: {$sku} | Quantity: {$quantity}");
                    }
                }

                $res = null;
                $data = [
                    'title' => $first->name,
                    'vendor' => $first->supplier?->name,
                    'product_type' => $first->type,
                    'variants' => $variants,
                ];
                if ($first->getAttribute('description')) {
                    $data['description'] = $first->description;
                }

                if ($shopifyProductId) {
                    $productService->update($shopifyProductId, $data);
                    $res = $productService->get($shopifyProductId);
                    Goods::where('code', $code)->update([
                        'last_shopify_push_at' => now(),
                    ]);
                } else {
                    $res = $productService->create($data);
                    if (isset($res['product']['id'])) {
                        $shopifyProductId = $res['product']['id'];
                        $this->info("Successfully created new product: Code: {$code} (Shopify ID: {$shopifyProductId})");
                    }
                    if ($shopifyProductId) {
                        Goods::where('code', $code)->update([
                            'shopify_product_id' => $shopifyProductId,
                            'last_shopify_push_at' => now(),
                        ]);
                    }
                }
                foreach ($res['product']['variants'] ?? [] as $variant) {
                    $sku = $variant['sku'] ?? null;
                    $variantId = $variant['id'] ?? null;
                    $inventoryItemId = $variant['inventory_item_id'] ?? null;
                    if ($sku && $inventoryItemId) {
                        $quantity = $quantities[$sku] ?? 0;
                        Item::where('barcode', $sku)->update([
                            'shopify_variant_id' => $variantId,
                            'shopify_inventory_item_id' => $inventoryItemId,
                            'last_shopify_push_at' => now(),
                        ]);
                        try {
                            $inventoryService->set($inventoryItemId, $quantity);
                            $this->info("Synced SKU [{$sku}] -> Variant: {$variantId} | InventoryItem: {$inventoryItemId} | Qty: {$quantity}");
                        } catch (\Exception $e) {
                            $this->error("Failed to update inventory level for SKU [{$sku}]: " . $e->getMessage());
                        }
                    }
                }
                Stock::whereHas('goods', function ($q) use ($code) {
                    $q->where('code', $code);
                })
                    ->whereIn('type', ['PURCHASE', 'SHIPPING'])
                    ->where(function ($q) {
                        $q->where('synced_to_shopify', false)
                            ->orWhereNull('synced_to_shopify');
                    })
                    ->update(['synced_to_shopify' => true]);
                $syncedCount++;
                usleep(500000); // Rate limit buffer
            } catch (\Exception $e) {
                $this->error("Error processing product code {$code}: " . $e->getMessage() . " Trace: " . $e->getTraceAsString());
                return Command::FAILURE;
            }
        }

        $this->info('Stock synchronization process complete!');
        $this->info("Total unique product codes synced to Shopify: {$syncedCount}");
        return Command::SUCCESS;
    }
}