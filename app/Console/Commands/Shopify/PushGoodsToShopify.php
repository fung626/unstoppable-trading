<?php
namespace App\Console\Commands\Shopify;

use App\Models\Goods\Goods;
use App\Services\Shopify\ShopifyProductService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class PushGoodsToShopify extends Command
{
    protected $signature = 'shopify:push-goods
        {--limit=3 : Number of limited goods to sync}
        {--code= : Specific goods code to sync}';
    protected $description = 'Sync goods and inventory by aggregating all variants per goods code';

    public function handle(ShopifyProductService $shopify)
    {
        @ini_set('memory_limit', '512M');
        $limit = (int) $this->option('limit');
        $code = $this->option('code');
        $this->info("Checking for un-synced goods records...");

        $syncedCount = 0;

        $query = Goods::with(['supplier', 'items', 'items.stocks'])
            ->where(function ($q) {
                $q->whereNull('shopify_product_id')
                    ->orWhereNull('last_shopify_push_at')
                    ->orWhereColumn('updated_at', '>', 'last_shopify_push_at')
                    ->orWhereHas('items', function ($iq) {
                        $iq->whereNull('last_shopify_push_at')
                            ->orWhereColumn('updated_at', '>', 'last_shopify_push_at');
                    })
                    ->orWhereHas('items.stocks', function ($sq) {
                        $sq->whereIn('type', ['PURCHASE', 'SHIPPING'])
                            ->where(function ($subq) {
                                $subq->where('synced_to_shopify', false)
                                    ->orWhereNull('synced_to_shopify');
                            });
                    });
            });

        if ($code) {
            $query->where('code', $code);
        }

        $goods = $query->limit($limit)->get();

        if ($goods->isEmpty()) {
            $this->info('No goods found requiring synchronization.');
            return Command::SUCCESS;
        }

        foreach ($goods as $g) {
            $this->info("Pushing goods with Code: {$g->code}");
            $variants = [];
            foreach ($g->items as $item) {
                $quantity = $item->stocks->sum('unit');
                $variants[] = [
                    'price' => $item->retail_price ?? $g->retail_price,
                    'sku' => $item->barcode ?? $g->code,
                    'option1' => $item->cup ?? 'Default',
                    'option2' => $item->color ?? 'Default',
                    'option3' => $item->size ?? 'Default',
                    'inventory_management' => 'shopify',
                    'inventory_quantity' => (int) $quantity,
                ];
                // $this->info("Prepared variant for SKU: {$item->barcode} | Quantity: {$quantity}");
            }

            if (count($variants) > 100) {
                $this->warn("Variants count (" . count($variants) . ") exceeds Shopify REST limit (100). Delegating to GraphQL command...");
                try {
                    Artisan::call('shopify:push-goods-graphql', [
                        '--code' => $g->code,
                    ]);
                    $this->info(trim(Artisan::output()));
                    $syncedCount++;
                } catch (\Exception $e) {
                    $this->error("Error delegating code {$g->code} to GraphQL: " . $e->getMessage());
                    return Command::FAILURE;
                }
                continue;
            }

            $data = [
                'title' => $g->name,
                'vendor' => $g->supplier?->name,
                'product_type' => $g->type,
                'variants' => $variants,
            ];

            if ($g->getAttribute('description')) {
                $data['description'] = $g->description;
            }

            $shopifyProductId = $g->shopify_product_id;

            try {
                if ($shopifyProductId) {
                    $result = $shopify->update($shopifyProductId, $data);
                } else {
                    $result = $shopify->create($data);
                }

                $resolvedId = $result['product']['id'] ?? $shopifyProductId;
                // $this->info("Shopify API response for goods code {$g->code}: " . json_encode($result));

                if ($resolvedId) {
                    Goods::where('code', $g->code)->update([
                        'shopify_product_id' => $resolvedId,
                        'last_shopify_push_at' => now(),
                    ]);

                    foreach ($g->items as $item) {
                        $item->update([
                            'last_shopify_push_at' => now(),
                        ]);
                        $item->stocks()
                            ->whereIn('type', ['PURCHASE', 'SHIPPING'])
                            ->where(function ($subq) {
                                $subq->where('synced_to_shopify', false)
                                    ->orWhereNull('synced_to_shopify');
                            })
                            ->update(['synced_to_shopify' => true]);
                    }
                    $this->info("Successfully created/updated product: Code: {$g->code} (Shopify ID: {$resolvedId})");
                }
                $syncedCount++;
                usleep(500000); // Rate limit buffer
            } catch (\Exception $e) {
                $this->error("Error syncing goods code {$g->code}: " . $e->getMessage());
                return Command::FAILURE;
            }
        }

        $this->info('Goods push process complete!');
        $this->info("Total unique goods pushed to Shopify: {$syncedCount}");
        return Command::SUCCESS;
    }
}