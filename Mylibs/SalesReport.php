<?php

namespace App\Mylibs;

use App\Models\Goods\Stock\Stock as StockModel;
use App\Mylibs\Common;
use Illuminate\Support\Facades\DB;
use \Carbon\Carbon;

class SalesReport
{

    /**
     * Source: https://www.netsuite.com/portal/resource/articles/inventory-management/average-inventory.shtml
     * Formula
     * Average Inventory = (current inventory + previous inventory) / number of periods
     * October ending inventory: $285,000
     * November ending inventory: $313,000
     * December ending inventory: $112,000
     * Total: $710,000
     * Average inventory = $710,000 / 3 = $236,667
     **/
    public static function averageInventory($form, $to, $priceTag = 'cost_price')
    {
        $range = Common::getMonthsFromRange($form, $to);
        $periods = count($range);
        $index = 0;
        $total = 0;
        $averageInventory = 0;
        $query = null;
        if ($periods === 0) {
            return 0;
        }
        foreach ($range as $date) {
            $exploded = explode("-", $date);
            $year = $exploded[0];
            $month = $exploded[1];
            if ($index === 0) {
                $query = StockModel::select([DB::raw('COALESCE(SUM(goods_stock.unit * goods.' . $priceTag . '), 0) as sum')])
                    ->leftJoin('goods', 'goods.id', '=', 'goods_stock.goods_id')
                    ->where('goods_stock.type', 'PURCHASE')
                    ->whereMonth('goods_stock.created_at', $month)
                    ->whereYear('goods_stock.created_at', $year);
            } else {
                $subquery = StockModel::select([DB::raw('COALESCE(SUM(goods_stock.unit * goods.' . $priceTag . '), 0) as sum')])
                    ->leftJoin('goods', 'goods.id', '=', 'goods_stock.goods_id')
                    ->where('goods_stock.type', 'PURCHASE')
                    ->whereMonth('goods_stock.created_at', $month)
                    ->whereYear('goods_stock.created_at', $year);
                $query = $query->unionAll($subquery);
            }
            $index++;
        }

        $result = $query->get();

        foreach ($result as $data) {
            $total += $data->sum;
        }
        $averageInventory = $total / $periods;

        return $averageInventory;
    }

    /**
     * Source: https://www.netsuite.com/portal/resource/articles/inventory-management/average-inventory.shtml
     * Formula
     * Inventory Turnover Ratio = Cost of Goods Sold (COGS) / Average Inventory
     **/
    public static function inventoryTurnover($form, $to, $priceTag = 'cost_price')
    {
        $range = Common::getMonthsFromRange($form, $to);
        $periods = count($range);
        $index = 0;
        $COGS = 0;
        if ($periods === 0) {
            return 0;
        }
        foreach ($range as $date) {
            $exploded = explode("-", $date);
            $year = $exploded[0];
            $month = $exploded[1];
            if ($index === 0) {
                $query = StockModel::select([DB::raw('COALESCE(SUM(goods_stock.unit * goods.' . $priceTag . '), 0) as sum')])
                    ->leftJoin('goods', 'goods.id', '=', 'goods_stock.goods_id')
                    ->where('goods_stock.type', 'SHIP')
                    ->whereMonth('goods_stock.created_at', $month)
                    ->whereYear('goods_stock.created_at', $year);
            } else {
                $subquery = StockModel::select([DB::raw('COALESCE(SUM(goods_stock.unit * goods.' . $priceTag . '), 0) as sum')])
                    ->leftJoin('goods', 'goods.id', '=', 'goods_stock.goods_id')
                    ->where('goods_stock.type', 'SHIP')
                    ->whereMonth('goods_stock.created_at', $month)
                    ->whereYear('goods_stock.created_at', $year);
                $query = $query->unionAll($subquery);
            }
            $index++;
        }
        $result = $query->get();
        foreach ($result as $data) {
            $COGS += $data->sum;
        }

        $averageInventory = self::averageInventory($form, $to);
        $turnover = $COGS / $averageInventory;

        return $turnover;
    }

    /**
     * Source: https://www.netsuite.com/portal/resource/articles/inventory-management/average-inventory.shtml
     * Formula
     * Accounts Receivable Turnover Ratio = Net Credit Sales / Average Accounts Receivable
     **/
    public static function receivableTurnover()
    {

    }

    /**
     * Source: https://www.tradegecko.com/inventory-management/days-inventory-outstanding
     * Inventory days formula - Days Inventory Outstanding (DIO)
     * Days inventory outstanding formula:
     * Calculate the cost of average inventory, by adding together the beginning inventory and ending inventory balances for a single month, and divide by two.
     * Determine the cost of goods sold, from your annual income statement
     * Divide cost of average inventory by cost of goods sold
     * Multiply the result by 365
     * Formula
     * Accounts Receivable Turnover Ratio = ( Cost of Goods Sold (COGS) ) x 365
     **/
    public static function DIO($date = null, $priceTag = 'cost_price')
    {
        $carbon = Carbon::now();
        $last = $carbon->subMonth()->format('Y-m');
        $current = $carbon->format('Y-m');
        $range = [$last, $current];

        $index = 0;
        $total = 0;
        $averageInventory = 0;

        foreach ($range as $date) {
            $exploded = explode("-", $date);
            $year = $exploded[0];
            $month = $exploded[1];
            if ($index === 0) {
                $query = StockModel::select([DB::raw('COALESCE(SUM(goods_stock.unit * goods.' . $priceTag . '), 0) as sum')])
                    ->leftJoin('goods', 'goods.id', '=', 'goods_stock.goods_id')
                    ->whereMonth('goods_stock.created_at', $month)
                    ->whereYear('goods_stock.created_at', $year);
            } else {
                $subquery = StockModel::select([DB::raw('COALESCE(SUM(goods_stock.unit * goods.' . $priceTag . '), 0) as sum')])
                    ->leftJoin('goods', 'goods.id', '=', 'goods_stock.goods_id')
                    ->whereMonth('goods_stock.created_at', $month)
                    ->whereYear('goods_stock.created_at', $year);
                $query = $query->unionAll($subquery);
            }
            $index++;
        }

        $result = $query->get();

        foreach ($result as $data) {
            $total += $data->sum;
        }
        $averageInventory = $total / 2;

        dd($averageInventory);
    }

    /**
     * Source: https://www.skillsyouneed.com/num/percent-change.html
     * Formula
     * Increase = New - Original
     * Change = Increase ÷ Original × 100
     **/
    public static function change($new, $original)
    {
        $increase = $new - $original;
        return $increase / $original * 100;
    }

}