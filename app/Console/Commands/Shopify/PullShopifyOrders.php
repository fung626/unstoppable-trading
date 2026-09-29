<?php
namespace App\Console\Commands\Shopify;

use App\Models\Goods\Item;
use App\Models\Goods\Stock\Stock;
use App\Models\Goods\Stock\StockShopifyOrder;
use App\Mylibs\SafeCache;
use App\Services\Shopify\ShopifyOrderService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class PullShopifyOrders extends Command
{
    protected $signature = 'shopify:pull-orders
        {--limit=3 : Number of unique product codes to sync}';
    protected $description = 'Pull Shopify API for recently updated orders using last sync tracking';

    public function handle(ShopifyOrderService $shopifyService)
    {
        @ini_set('memory_limit', '256M');
        $lastSyncTime = SafeCache::get('shopify_last_order_sync', Carbon::now()->subDay());
        $nextSyncTime = Carbon::now();
        $this->info("Fetching Shopify orders updated since: {$lastSyncTime->toIso8601String()}");
        try {
            $orders = $shopifyService->get([
                'updated_at_min' => $lastSyncTime->toIso8601String(),
            ]);
            $this->info("Fetched " . count($orders) . " orders from Shopify.");
            if (empty($orders)) {
                $this->info('No new or updated orders found.');
                SafeCache::put('shopify_last_order_sync', $nextSyncTime);
                return Command::SUCCESS;
            }
            foreach ($orders as $order) {
                if (!is_array($order) || !isset($order['id'])) {
                    Log::warning('Unexpected order structure received from Shopify: ' . json_encode($order));
                    continue;
                }
                $orderId = $order['id'];
                $orderName = $order['name'];
                $financialStatus = $order['financial_status'] ?? '';
                $fulfillmentStatus = $order['fulfillment_status'] ?? '';
                $closedAt = $order['closed_at'] ?? null;
                $cancelledAt = $order['cancelled_at'] ?? null;

                $isDone = ($financialStatus === 'paid'
                    && $fulfillmentStatus === 'fulfilled'
                    && $closedAt !== null
                    && $cancelledAt === null);

                if (!$isDone) {
                    continue;
                }

                $synced = StockShopifyOrder::where('shopify_order_id', $orderId)->exists();
                if ($synced) {
                    $this->info("Order {$orderName} (ID: {$orderId}) already synced. Skipping.");
                    continue;
                }

                $this->info("Processing Completed Order {$orderName} (ID: {$orderId})");

                foreach ($order['line_items'] as $lineItem) {
                    $sku = $lineItem['sku'] ?? null;
                    $quantity = $lineItem['quantity'] ?? 0;
                    $price = $lineItem['price'] ?? 0;

                    if (!$sku) {
                        continue;
                    }

                    $item = Item::where('barcode', $sku)->first();
                    if (!$item) {
                        $this->warn("SKU [{$sku}] not found locally for order {$orderName}.");
                        continue;
                    }

                    $stock = Stock::create([
                        'goods_id' => $item->goods_id,
                        'goods_item_id' => $item->id,
                        'unit' => -$quantity,
                        'unit_price' => $price,
                        'type' => 'SHOPIFY_ORDER',
                        'synced_to_shopify' => true,
                    ]);

                    StockShopifyOrder::create([
                        'goods_stock_id' => $stock->id,
                        'shopify_order_id' => $orderId,
                    ]);

                    $this->info("Pulled SKU [{$sku}] (Qty: {$quantity}) for order {$orderName}.");
                }
            }

            SafeCache::put('shopify_last_order_sync', $nextSyncTime);
            $this->info('Shopify order pull complete.');
            return Command::SUCCESS;
        } catch (\Exception $e) {
            Log::error('Shopify Order Pull Error: ' . $e->getMessage());
            $this->error('Sync failed: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}