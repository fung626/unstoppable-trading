<?php
namespace App\Console\Commands\Shopify;

use App\Services\Shopify\ShopifyProductGraphQLService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class CleanDuplicateProducts extends Command
{
    protected $signature   = 'shopify:clean-duplicates {--dry-run : Only list duplicates without deleting them}';
    protected $description = 'Finds and deletes duplicate products on Shopify efficiently using a progress bar and triggers auto-reconciliation';

    public function handle(ShopifyProductGraphQLService $service)
    {
        @ini_set('memory_limit', '512M');
        $isDryRun = $this->option('dry-run');
        $this->info("Fetching products from Shopify...");

        $products = $service->all();
        $this->info("Total products fetched from Shopify: " . count($products));

        $grouped = [];
        foreach ($products as $product) {
            $title = trim($product['title']);
            $grouped[$title][] = $product;
        }

        $duplicateGidsToDelete = [];
        $duplicateGroupsCount = 0;

        foreach ($grouped as $title => $prods) {
            if (count($prods) > 1) {
                $duplicateGroupsCount++;
                usort($prods, fn($a, $b) => strtotime($a['createdAt']) <=> strtotime($b['createdAt']));
                $keeper = array_shift($prods);
                if ($isDryRun) {
                    $this->line("Group '{$title}': Keeping ID {$keeper['id']} (Created: {$keeper['createdAt']}), queueing " . count($prods) . " duplicate(s) for deletion.");
                }
                foreach ($prods as $duplicate) {
                    $duplicateGidsToDelete[] = $duplicate['id'];
                }
            }
        }

        $totalDuplicates = count($duplicateGidsToDelete);

        if ($duplicateGroupsCount === 0) {
            $this->info("No duplicate products found on Shopify.");
            return Command::SUCCESS;
        }

        $this->info("\nFound {$duplicateGroupsCount} duplicate groups containing a total of {$totalDuplicates} redundant products.");

        if ($isDryRun) {
            $this->warn("Dry run mode enabled. No products were deleted.");
            return Command::SUCCESS;
        }

        if (!$this->confirm('Do you want to proceed with deleting these duplicates from Shopify?', true)) {
            $this->info("Action cancelled.");
            return Command::SUCCESS;
        }

        $this->info("Starting Shopify cleanup...");
        $bar = $this->output->createProgressBar($totalDuplicates);
        $bar->start();

        foreach ($duplicateGidsToDelete as $gid) {
            try {
                $service->delete($gid);
                usleep(100000);
            } catch (\Exception $e) {
                $this->error("Failed to delete product with ID {$gid}: " . $e->getMessage());
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("Shopify duplicate cleanup complete!");

        $this->info("Running reconciliation to bind local database records to surviving Shopify products...");
        Artisan::call('shopify:reconcile', [], $this->output);

        $this->info("\nAll duplicates removed and database fully synchronized!");
        return Command::SUCCESS;
    }
}