<?php
namespace App\Console\Commands\Shopify;

use App\Models\Goods\Goods;
use App\Services\Shopify\ShopifyProductGraphQLService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ReconcileShopifyIds extends Command
{
    protected $signature = 'shopify:reconcile
        {--dry-run : Only preview matches without saving to database}
        {--code= : Specific goods code to reconcile}';
    protected $description = 'Reconciles goods and items with missing Shopify IDs by matching titles and variant options against existing Shopify products';

    public function handle(ShopifyProductGraphQLService $service)
    {
        @ini_set('memory_limit', '512M');
        $isDryRun = $this->option('dry-run');
        $code = $this->option('code');
        $this->info("Fetching all products and variants from Shopify...");

        $products = $service->allWithVariants();
        $this->info("Total Shopify products fetched: " . count($products));

        $smap = [];
        foreach ($products as $sp) {
            $pkey = strtolower(trim($sp['title']));
            $vmap = [];
            foreach ($sp['variants']['nodes'] as $sv) {
                $options = collect($sv['selectedOptions'])->pluck('value', 'name')->toArray();
                $sig = (isset($options['Cup']) ? $options['Cup'] : 'Default') . '|' .
                    (isset($options['Color']) ? $options['Color'] : 'Default') . '|' .
                    (isset($options['Size']) ? $options['Size'] : 'Default');
                $vmap[$sig] = [
                    'variant_id' => str_replace("gid://shopify/ProductVariant/", "", $sv['id']),
                    'inventory_item_id' => str_replace("gid://shopify/InventoryItem/", "", $sv['inventoryItem']['id'] ?? ''),
                ];
            }
            $smap[$pkey] = [
                'product_gid' => $sp['id'],
                'numeric_product_id' => str_replace("gid://shopify/Product/", "", $sp['id']),
                'variants' => $vmap,
            ];
        }

        $query = Goods::with(['items'])->whereNull('shopify_product_id');

        if ($code) {
            $query->where('code', $code);
            $this->info("Targeting specific goods code: {$code}");
        }

        $goods = $query->get();

        $this->info("Found " . $goods->count() . " local goods records with missing Shopify Product IDs.");

        $mcount = 0;
        $ucount = 0;

        foreach ($goods as $g) {
            $gkey = strtolower(trim($g->code));
            if (!isset($smap[$gkey])) {
                $this->warn("No matching Shopify product found for Local Code: {$g->code} | Title: '{$g->name}'");
                $ucount++;
                continue;
            }
            $match = $smap[$gkey];
            $numericProductId = $match['numeric_product_id'];
            $svariants = $match['variants'];
            $this->info("MATCH FOUND: Code {$g->code} ('{$g->name}') -> Shopify ID: {$numericProductId}");
            if (!$isDryRun) {
                DB::transaction(function () use ($g, $numericProductId, $svariants) {
                    $g->update([
                        'shopify_product_id' => $numericProductId,
                        'last_shopify_push_at' => now(),
                    ]);
                    foreach ($g->items as $item) {
                        $cup = $item->cup ?: 'Default';
                        $color = $item->color ?: 'Default';
                        $size = $item->size ?: 'Default';
                        $sig = "{$cup}|{$color}|{$size}";
                        $vdata = $svariants[$sig] ?? [];
                        if (!empty($vdata)) {
                            $item->update([
                                'shopify_variant_id' => $vdata['variant_id'] ?? null,
                                'shopify_inventory_item_id' => $vdata['inventory_item_id'] ?? null,
                                'last_shopify_push_at' => now(),
                            ]);
                        }
                    }
                });
                $this->line("   -> Successfully reconciled database IDs and variants.");
            }
            $mcount++;
        }

        $this->info("\n--- Reconciliation Summary ---");
        $this->info("Successfully matched & linked: {$mcount}");
        $this->info("Unmatched (do not exist on Shopify yet): {$ucount}");

        if ($isDryRun) {
            $this->warn("Dry run mode: No database changes were saved.");
        }

        return Command::SUCCESS;
    }
}