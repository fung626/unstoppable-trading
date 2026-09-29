<?php
namespace App\Console\Commands\Shopify;

use App\Models\Goods\Goods;
use App\Services\Shopify\ShopifyLocationService;
use App\Services\Shopify\ShopifyProductGraphQLService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PushGoodsToShopifyGraphQL extends Command
{
    protected $signature = 'shopify:push-goods-graphql
        {--limit=3 : Number of limited goods to sync}
        {--code= : Specific goods code to sync}';

    protected $description = 'Sync goods and massive variant arrays to Shopify using GraphQL Service';

    public function handle(ShopifyProductGraphQLService $service, ShopifyLocationService $locationService)
    {
        @ini_set('memory_limit', '512M');
        $limit = (int) $this->option('limit');
        $code = $this->option('code');

        $this->info("Checking for un-synced goods records (GraphQL Service Mode)...");

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
            $this->info('No un-synced goods records found.');
            return Command::SUCCESS;
        }

        $syncedCount = 0;
        $failedCount = 0;

        foreach ($goods as $g) {
            $this->info("Processing Goods Code: {$g->code} | Total Variants: {$g->items->count()}");

            // Normalize option values consistently using 'Default' for empty fields
            $cups = $g->items->map(fn($item) => trim($item->cup) !== '' ? trim($item->cup) : 'Default')->unique()->values()->all();
            $colors = $g->items->map(fn($item) => trim($item->color) !== '' ? trim($item->color) : 'Default')->unique()->values()->all();
            $sizes = $g->items->map(fn($item) => trim($item->size) !== '' ? trim($item->size) : 'Default')->unique()->values()->all();

            $variants = [];
            foreach ($g->items as $item) {
                $quantity = $item->stocks->sum('unit');

                $itemCup = trim($item->cup) !== '' ? trim($item->cup) : 'Default';
                $itemColor = trim($item->color) !== '' ? trim($item->color) : 'Default';
                $itemSize = trim($item->size) !== '' ? trim($item->size) : 'Default';

                // Every variant must include an option value for Cup, Color, and Size to match productOptions
                $variants[] = [
                    'price' => (string) ($item->retail_price ?? $g->retail_price ?? 0),
                    'sku' => $item->barcode ?? $g->code,
                    'inventoryQuantities' => [
                        [
                            'locationId' => 'gid://shopify/Location/' . $locationService->getDefaultId(),
                            'name' => 'available',
                            'quantity' => (int) $quantity,
                        ],
                    ],
                    'optionValues' => [
                        ['optionName' => 'Cup', 'name' => $itemCup],
                        ['optionName' => 'Color', 'name' => $itemColor],
                        ['optionName' => 'Size', 'name' => $itemSize],
                    ],
                ];
            }

            $input = [
                'title' => $g->name,
                'vendor' => $g->supplier?->name ?? '',
                'productType' => $g->type ?? '',
                'descriptionHtml' => $g->description ?? '',
                'productOptions' => [
                    [
                        'name' => 'Cup',
                        'linkedMetafield' => null,
                        'values' => array_map(fn($val) => ['name' => (string) $val], $cups),
                    ],
                    [
                        'name' => 'Color',
                        'values' => array_map(fn($val) => ['name' => (string) $val], $colors),
                    ],
                    [
                        'name' => 'Size',
                        'values' => array_map(fn($val) => ['name' => (string) $val], $sizes),
                    ],
                ],
            ];

            $gid = null;
            if ($g->shopify_product_id) {
                $gid = str_starts_with($g->shopify_product_id, 'gid://')
                    ? $g->shopify_product_id
                    : "gid://shopify/Product/{$g->shopify_product_id}";
            }

            try {
                $result = $service->save($input, $variants, $gid);
                $resolvedGid = $result['product_gid'] ?? null;
                $shopifyVariants = $result['variants'] ?? [];

                if ($resolvedGid) {
                    $shopifyVariantMap = [];
                    foreach ($shopifyVariants as $sv) {
                        $options = collect($sv['selectedOptions'])->pluck('value', 'name')->toArray();
                        $sig = (isset($options['Cup']) ? $options['Cup'] : 'Default') . '|' .
                            (isset($options['Color']) ? $options['Color'] : 'Default') . '|' .
                            (isset($options['Size']) ? $options['Size'] : 'Default');

                        $shopifyVariantMap[$sig] = [
                            'variant_id' => str_replace("gid://shopify/ProductVariant/", "", $sv['id']),
                            'inventory_item_id' => str_replace("gid://shopify/InventoryItem/", "", $sv['inventoryItem']['id'] ?? ''),
                        ];
                    }

                    DB::transaction(function () use ($g, $resolvedGid, $shopifyVariantMap) {
                        $shopifyProductId = str_replace("gid://shopify/Product/", "", $resolvedGid);
                        Goods::where('code', $g->code)->update([
                            'shopify_product_id' => $shopifyProductId,
                            'last_shopify_push_at' => now(),
                        ]);

                        foreach ($g->items as $item) {
                            $itemCup = trim($item->cup) !== '' ? trim($item->cup) : 'Default';
                            $itemColor = trim($item->color) !== '' ? trim($item->color) : 'Default';
                            $itemSize = trim($item->size) !== '' ? trim($item->size) : 'Default';
                            $sig = "{$itemCup}|{$itemColor}|{$itemSize}";

                            $shopifyData = $shopifyVariantMap[$sig] ?? null;

                            $item->update([
                                'shopify_variant_id' => $shopifyData['variant_id'] ?? null,
                                'shopify_inventory_item_id' => $shopifyData['inventory_item_id'] ?? null,
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
                    });

                    $this->info("SUCCESS: Synced Code: {$g->code} via GraphQL Service (GID: {$resolvedGid})");
                    $syncedCount++;
                }

                usleep(500000); // Rate limit buffer

            } catch (\Exception $e) {
                $this->error("EXCEPTION for code {$g->code}: " . $e->getMessage());
                Log::error("Shopify GraphQL Push Exception for Code {$g->code}: " . $e->getMessage());
                $failedCount++;
                continue;
            }
        }

        $this->info('GraphQL Goods push process complete!');
        $this->info("Total unique goods successfully pushed: {$syncedCount}");

        if ($failedCount > 0) {
            $this->warn("Total failed syncs: {$failedCount}");
            return Command::FAILURE;
        }
        return Command::SUCCESS;
    }
}