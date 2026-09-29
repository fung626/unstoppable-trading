<?php
namespace App\Services\Goods;

use App\Models\Goods\Goods;
use App\Models\Goods\Item as GoodsItem;
use App\Models\Goods\Stock\Stock as GoodsStock;
use App\Models\Goods\Supplier;
use App\Mylibs\ColorHelper;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GoodsCsvImportService
{
    private ColorHelper $colorHelper;

    private const HEADER_INDEX = [
        'number' => 0,
        'supplier_number' => 1,
        'code' => 2,
        'type' => 3,
        'color' => 4,
        'cup' => 5,
        'size_32' => 6,
        'size_34' => 7,
        'size_36' => 8,
        'size_38' => 9,
        'size_40' => 10,
        'size_42' => 11,
        'size_44' => 12,
        'total' => 13,
        'cost_twd' => 14,
        'cost_hkd' => 15,
        'wholesale' => 16,
        'retail' => 17,
        'remark' => 18,
        'date' => 19,
    ];

    private const SIZE_MAP = [
        'size_32' => '32-S',
        'size_34' => '34-M',
        'size_36' => '36-L',
        'size_38' => '38-XL',
        'size_40' => '40-Q',
        'size_42' => '42-EQ',
        'size_44' => '44-Free',
    ];

    public function __construct(?ColorHelper $colorHelper = null)
    {
        $this->colorHelper = $colorHelper ?? new ColorHelper();
    }

    public function import(string $csvPath, array $options = []): array
    {
        @ini_set('max_execution_time', '0');
        @ini_set('memory_limit', '512M');
        @set_time_limit(0);
        DB::disableQueryLog();

        $dryRun = (bool) ($options['dry_run'] ?? false);
        $limit = isset($options['limit']) ? (int) $options['limit'] : null;
        $mode = (string) ($options['mode'] ?? 'append');
        $userId = $options['user_id'] ?? null;
        $filename = (string) ($options['filename'] ?? basename($csvPath));
        $onProgress = $options['on_progress'] ?? null;
        $progressEvery = isset($options['progress_every']) ? max(1, (int) $options['progress_every']) : 100;

        if (is_dir($csvPath)) {
            throw new \InvalidArgumentException("The provided path is a directory, not a CSV file: " . $csvPath);
        }

        if (!is_file($csvPath) || !is_readable($csvPath)) {
            throw new \RuntimeException('csv file not found or unreadable');
        }

        $summary = [
            'filename' => $filename,
            'mode' => $mode,
            'dry_run' => $dryRun,
            'rows_read' => 0,
            'rows_valid' => 0,
            'rows_skipped' => 0,
            'goods_created' => 0,
            'items_created' => 0,
            'suppliers_created' => 0,
            'sample_skips' => [],
        ];

        $goodsIdByCode = [];
        $supplierIdByNumber = [];
        $itemKeysByGoodsId = [];
        $supplierNumbers = [];
        $goodsCodes = [];
        $processedValidRows = 0;
        $line = 0;

        $this->emitProgress($onProgress, [
            'phase' => 'reading',
            'rows_read' => 0,
            'rows_valid' => 0,
            'rows_processed' => 0,
            'percent' => 0,
        ]);

        if ($dryRun) {
            DB::beginTransaction();
        } else if ($mode === 'replace') {
            DB::beginTransaction();
            try {
                GoodsStock::truncate();
                GoodsItem::truncate();
                Goods::truncate();
            } catch (\Throwable $e) {
                DB::rollBack();
                throw new \RuntimeException('failed to clear existing goods data: ' . $e->getMessage());
            }
        }

        try {
            $handle = fopen($csvPath, 'r');
            if ($handle === false) {
                throw new \RuntimeException('unable to open csv');
            }

            while (($raw = fgetcsv($handle, 0, ',', '"', '\\')) !== false) {
                $line++;

                if ($line === 1) {
                    continue;
                }

                if ($limit && $summary['rows_valid'] >= $limit) {
                    break;
                }

                $summary['rows_read']++;
                $row = $this->normalizeRow($raw);

                if ($summary['rows_read'] % $progressEvery === 0) {
                    $this->emitProgress($onProgress, [
                        'phase' => 'reading',
                        'rows_read' => $summary['rows_read'],
                        'rows_valid' => $summary['rows_valid'],
                        'rows_processed' => 0,
                        'percent' => 0,
                    ]);
                }

                if (!$this->isImportableRow($row)) {
                    $summary['rows_skipped']++;
                    if (count($summary['sample_skips']) < 20) {
                        $summary['sample_skips'][] = [
                            'line' => $line,
                            'reason' => 'missing required values',
                        ];
                    }
                    continue;
                }

                $summary['rows_valid']++;
                $supplierNumber = $this->cell($row, 'supplier_number');
                $code = $this->cell($row, 'code');

                if ($supplierNumber !== '') {
                    $supplierNumbers[$supplierNumber] = true;
                }

                if ($code !== '') {
                    $goodsCodes[$code] = true;
                }
            }

            fclose($handle);

            $this->emitProgress($onProgress, [
                'phase' => 'processing',
                'rows_read' => $summary['rows_read'],
                'rows_valid' => $summary['rows_valid'],
                'rows_processed' => 0,
                'percent' => 0,
            ]);

            $supplierNumberList = array_keys($supplierNumbers);

            if (!empty($supplierNumberList)) {
                foreach (array_chunk($supplierNumberList, 1000) as $numberChunk) {
                    $existingSuppliers = Supplier::whereIn('number', $numberChunk)
                        ->select('id', 'number')
                        ->get();

                    foreach ($existingSuppliers as $existingSupplier) {
                        $supplierIdByNumber[(string) $existingSupplier->number] = (string) $existingSupplier->id;
                    }
                }

                $missingSupplierNumbers = array_values(array_diff($supplierNumberList, array_keys($supplierIdByNumber)));
                if (!empty($missingSupplierNumbers)) {
                    $now = now();
                    $newSuppliers = [];

                    foreach ($missingSupplierNumbers as $missingSupplierNumber) {
                        $supplierId = (string) Str::uuid();
                        $supplierIdByNumber[$missingSupplierNumber] = $supplierId;
                        $newSuppliers[] = [
                            'id' => $supplierId,
                            'number' => $missingSupplierNumber,
                            'name' => $missingSupplierNumber,
                            'contact' => '',
                            'phone_country_code' => '',
                            'phone' => '',
                            'fax_country_code' => '',
                            'fax' => '',
                            'email' => null,
                            'address' => null,
                            'cost_price_currency' => 'HKD',
                            'created_at' => $now,
                            'updated_at' => $now,
                        ];
                    }

                    if (!$dryRun) {
                        foreach (array_chunk($newSuppliers, 500) as $supplierInsertChunk) {
                            Supplier::insert($supplierInsertChunk);
                        }
                    }

                    $summary['suppliers_created'] = count($newSuppliers);
                }
            }

            $goodsCodeList = array_keys($goodsCodes);
            if (!empty($goodsCodeList)) {
                foreach (array_chunk($goodsCodeList, 1000) as $codeChunk) {
                    $existingGoods = Goods::whereIn('code', $codeChunk)
                        ->select('id', 'code')
                        ->get();

                    foreach ($existingGoods as $existingGood) {
                        $goodsIdByCode[(string) $existingGood->code] = (string) $existingGood->id;
                    }
                }

                $newGoodsRows = [];
                $goodsInsertChunkSize = 500;
                $goodsSourceValidRows = 0;
                $goodsProcessingLine = 0;
                $goodsHandle = fopen($csvPath, 'r');
                if ($goodsHandle === false) {
                    throw new \RuntimeException('unable to reopen csv for goods processing');
                }

                while (($goodsRaw = fgetcsv($goodsHandle, 0, ',', '"', '\\')) !== false) {
                    $goodsProcessingLine++;
                    if ($goodsProcessingLine === 1) {
                        continue;
                    }

                    $row = $this->normalizeRow($goodsRaw);
                    if (!$this->isImportableRow($row)) {
                        continue;
                    }

                    $goodsSourceValidRows++;
                    if ($limit && $goodsSourceValidRows > $summary['rows_valid']) {
                        break;
                    }

                    $code = $this->cell($row, 'code');
                    if ($code === '' || isset($goodsIdByCode[$code])) {
                        continue;
                    }

                    $supplierNumber = $this->cell($row, 'supplier_number');
                    $supplierId = $supplierIdByNumber[$supplierNumber] ?? null;
                    if (!$supplierId) {
                        continue;
                    }

                    $goodsData = $this->parseGoodsAttributes($row, $supplierId, $userId);
                    $goodsId = (string) Str::uuid();
                    $goodsData['id'] = $goodsId;
                    $goodsData['created_at'] = now();
                    $goodsData['updated_at'] = now();

                    $goodsIdByCode[$code] = $goodsId;
                    $newGoodsRows[] = $goodsData;
                    $summary['goods_created']++;

                    if (!$dryRun && count($newGoodsRows) >= $goodsInsertChunkSize) {
                        Goods::insert($newGoodsRows);
                        $newGoodsRows = [];
                    }
                }

                fclose($goodsHandle);

                if (!$dryRun && !empty($newGoodsRows)) {
                    Goods::insert($newGoodsRows);
                }
            }

            if (!empty($goodsIdByCode)) {
                $allGoodsIds = array_values($goodsIdByCode);
                foreach (array_chunk($allGoodsIds, 1000) as $goodsIdChunk) {
                    $existingItems = GoodsItem::whereIn('goods_id', $goodsIdChunk)
                        ->select('id', 'goods_id', 'size', 'color', 'cup')
                        ->get();

                    foreach ($existingItems as $existingItem) {
                        $existingGoodsId = (string) $existingItem->goods_id;
                        if (!isset($itemKeysByGoodsId[$existingGoodsId])) {
                            $itemKeysByGoodsId[$existingGoodsId] = [];
                        }

                        $itemKeysByGoodsId[$existingGoodsId][$this->itemUniqueKey(
                            (string) $existingItem->size,
                            $existingItem->color,
                            $existingItem->cup
                        )] = (string) $existingItem->id;
                    }
                }
            }

            $newItemRows = [];
            $itemInsertChunkSize = 1000;
            $newStockRows = [];
            $stockInsertChunkSize = 1000;
            $sourceValidRows = 0;
            $processingLine = 0;
            $processingHandle = fopen($csvPath, 'r');
            if ($processingHandle === false) {
                throw new \RuntimeException('unable to reopen csv for processing');
            }

            while (($processingRaw = fgetcsv($processingHandle, 0, ',', '"', '\\')) !== false) {
                $processingLine++;
                if ($processingLine === 1) {
                    continue;
                }

                $row = $this->normalizeRow($processingRaw);
                if (!$this->isImportableRow($row)) {
                    continue;
                }

                $sourceValidRows++;
                if ($limit && $sourceValidRows > $summary['rows_valid']) {
                    break;
                }

                $processedValidRows++;
                $lineNo = $processingLine;
                $supplierNumber = $this->cell($row, 'supplier_number');
                $supplierId = $supplierIdByNumber[$supplierNumber] ?? null;

                if (!$supplierId) {
                    $summary['rows_skipped']++;
                    if (count($summary['sample_skips']) < 20) {
                        $summary['sample_skips'][] = [
                            'line' => $lineNo,
                            'reason' => 'supplier cannot be resolved',
                        ];
                    }
                    continue;
                }

                $code = $this->cell($row, 'code');
                if (!isset($goodsIdByCode[$code])) {
                    $summary['rows_skipped']++;
                    if (count($summary['sample_skips']) < 20) {
                        $summary['sample_skips'][] = [
                            'line' => $lineNo,
                            'reason' => 'goods cannot be resolved',
                        ];
                    }
                    continue;
                }

                $goodsId = $goodsIdByCode[$code];
                if (!isset($itemKeysByGoodsId[$goodsId])) {
                    $itemKeysByGoodsId[$goodsId] = [];
                }

                foreach (self::SIZE_MAP as $sizeColumn => $sizeLabel) {
                    $qtyRaw = $this->cell($row, $sizeColumn);
                    if ($qtyRaw === '') {
                        continue;
                    }

                    $qty = (int) $this->toNumber($qtyRaw);

                    $itemData = $this->buildItemPayload($row, $goodsId, $sizeLabel, $userId);
                    $itemKey = $this->itemUniqueKey(
                        (string) $itemData['size'],
                        $itemData['color'],
                        $itemData['cup']
                    );

                    $itemId = $itemKeysByGoodsId[$goodsId][$itemKey] ?? null;
                    if (!$itemId) {
                        $itemId = (string) Str::uuid();
                        $itemData['id'] = $itemId;
                        $itemData['created_at'] = now();
                        $itemData['updated_at'] = now();

                        $itemKeysByGoodsId[$goodsId][$itemKey] = $itemId;
                        $newItemRows[] = $itemData;
                        $summary['items_created']++;

                        if (!$dryRun && count($newItemRows) >= $itemInsertChunkSize) {
                            GoodsItem::insert($newItemRows);
                            $newItemRows = [];
                        }
                    }

                    $stockPayload = $this->buildStockPayload(
                        $goodsId,
                        $itemId,
                        $qty,
                        $this->toNumber($this->cell($row, 'cost_twd'))
                    );
                    $stockPayload['id'] = (string) Str::uuid();
                    $stockPayload['created_at'] = now();
                    $stockPayload['updated_at'] = now();
                    $newStockRows[] = $stockPayload;

                    if (!$dryRun && count($newStockRows) >= $stockInsertChunkSize) {
                        GoodsStock::insert($newStockRows);
                        $newStockRows = [];
                    }
                }

                if ($processedValidRows % $progressEvery === 0 || $processedValidRows === $summary['rows_valid']) {
                    $percent = $summary['rows_valid'] > 0
                        ? round(($processedValidRows / $summary['rows_valid']) * 100, 2)
                        : 100;

                    $this->emitProgress($onProgress, [
                        'phase' => 'processing',
                        'rows_read' => $summary['rows_read'],
                        'rows_valid' => $summary['rows_valid'],
                        'rows_processed' => $processedValidRows,
                        'percent' => $percent,
                    ]);
                }
            }

            fclose($processingHandle);

            if (!$dryRun && !empty($newItemRows)) {
                GoodsItem::insert($newItemRows);
            }

            if (!$dryRun && !empty($newStockRows)) {
                GoodsStock::insert($newStockRows);
            }

            if ($dryRun && DB::transactionLevel() > 0) {
                DB::rollBack();
            }

            $this->emitProgress($onProgress, [
                'phase' => 'completed',
                'rows_read' => $summary['rows_read'],
                'rows_valid' => $summary['rows_valid'],
                'rows_processed' => $processedValidRows,
                'percent' => 100,
            ]);

            return $summary;
        } catch (\Throwable $e) {
            if (DB::transactionLevel() > 0) {
                DB::rollBack();
            }

            throw $e;
        }
    }

    public function importRow(array $rawRow, array $options = []): array
    {
        $dryRun = (bool) ($options['dry_run'] ?? false);
        $mode = (string) ($options['mode'] ?? 'append');
        $userId = $options['user_id'] ?? null;

        $delta = [
            'rows_skipped' => 0,
            'goods_created' => 0,
            'items_created' => 0,
            'suppliers_created' => 0,
            'sample_skip' => null,
        ];

        $row = $this->normalizeRow($rawRow);
        $skipReason = $this->getRowSkipReason($row);
        if ($skipReason !== null) {
            $delta['rows_skipped'] = 1;
            $delta['sample_skip'] = $skipReason;
            return $delta;
        }

        if ($dryRun) {
            DB::beginTransaction();
        }

        try {
            $supplierNumber = $this->cell($row, 'supplier_number');
            $supplier = Supplier::where('number', $supplierNumber)->select('id')->first();
            if ($supplier) {
                $supplierId = (string) $supplier->id;
            } else {
                $supplierId = (string) Str::uuid();
                $supplierPayload = [
                    'id' => $supplierId,
                    'number' => $supplierNumber,
                    'name' => $supplierNumber,
                    'contact' => '',
                    'phone_country_code' => '',
                    'phone' => '',
                    'fax_country_code' => '',
                    'fax' => '',
                    'email' => null,
                    'address' => null,
                    'cost_price_currency' => 'HKD',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                if (!$dryRun) {
                    Supplier::insert([$supplierPayload]);
                }

                $delta['suppliers_created']++;
            }

            $code = $this->cell($row, 'code');
            $goods = Goods::where('code', $code)
                ->select('id')
                ->first();

            if ($goods) {
                $goodsId = (string) $goods->id;
            } else {
                $goodsData = $this->parseGoodsAttributes($row, $supplierId, $userId);
                $goodsId = (string) Str::uuid();
                $goodsData['id'] = $goodsId;
                $goodsData['created_at'] = now();
                $goodsData['updated_at'] = now();

                if (!$dryRun) {
                    Goods::insert([$goodsData]);
                }

                $delta['goods_created']++;
            }

            foreach (self::SIZE_MAP as $sizeColumn => $sizeLabel) {
                $qtyRaw = $this->cell($row, $sizeColumn);
                if ($qtyRaw === '') {
                    continue;
                }

                $qty = (int) $this->toNumber($qtyRaw);

                $itemData = $this->buildItemPayload($row, $goodsId, $sizeLabel, $userId);
                $existsQuery = GoodsItem::where('goods_id', $goodsId)
                    ->where('size', (string) $itemData['size']);

                if ($itemData['color'] === null) {
                    $existsQuery->whereNull('color');
                } else {
                    $existsQuery->where('color', $itemData['color']);
                }

                if ($itemData['cup'] === null) {
                    $existsQuery->whereNull('cup');
                } else {
                    $existsQuery->where('cup', $itemData['cup']);
                }

                $existingItem = $existsQuery->select('id')->first();
                if ($existingItem) {
                    $itemId = (string) $existingItem->id;
                } else {
                    $itemId = (string) Str::uuid();
                    $itemData['id'] = $itemId;
                    $itemData['created_at'] = now();
                    $itemData['updated_at'] = now();

                    if (!$dryRun) {
                        GoodsItem::insert([$itemData]);
                    }

                    $delta['items_created']++;
                }

                $stockPayload = $this->buildStockPayload(
                    $goodsId,
                    $itemId,
                    $qty,
                    $this->toNumber($this->cell($row, 'cost_twd'))
                );

                if (!$dryRun) {
                    $stockExists = GoodsStock::where('goods_id', $stockPayload['goods_id'])
                        ->where('goods_item_id', $stockPayload['goods_item_id'])
                        ->where('unit', $stockPayload['unit'])
                        ->where('unit_price', $stockPayload['unit_price'])
                        ->where('type', $stockPayload['type'])
                        ->exists();

                    if (!$stockExists) {
                        $stockPayload['id'] = (string) Str::uuid();
                        $stockPayload['created_at'] = now();
                        $stockPayload['updated_at'] = now();
                        GoodsStock::insert([$stockPayload]);
                    }
                }
            }

            if ($dryRun && DB::transactionLevel() > 0) {
                DB::rollBack();
            } else if ($mode === 'replace' && !$dryRun && DB::transactionLevel() > 0) {
                DB::commit();
            }

            return $delta;
        } catch (\Throwable $e) {
            if (DB::transactionLevel() > 0) {
                DB::rollBack();
            }

            throw $e;
        }
    }

    private function normalizeRow(array $row): array
    {
        return array_map(function ($value) {
            return trim((string) $value);
        }, $row);
    }

    private function getRowSkipReason(array $row): ?string
    {
        $number = $this->cell($row, 'number');
        $supplier = $this->cell($row, 'supplier_number');
        $code = $this->cell($row, 'code');

        if ($number === '') {
            return 'missing number';
        }
        if (!is_numeric($number)) {
            return "number is not numeric (value: '{$number}')";
        }
        if ($supplier === '') {
            return 'missing supplier_number';
        }
        if ($code === '') {
            return 'missing code';
        }

        return null;
    }

    private function isImportableRow(array $row): bool
    {
        $number = $this->cell($row, 'number');
        $supplier = $this->cell($row, 'supplier_number');
        $code = $this->cell($row, 'code');

        if ($number === '' || !is_numeric($number)) {
            return false;
        }

        return $supplier !== '' && $code !== '';
    }

    private function parseGoodsAttributes(array $row, string $supplierId, $userId): array
    {
        return [
            'number' => $this->cell($row, 'number'),
            'code' => $this->cell($row, 'code'),
            'name' => $this->cell($row, 'code'),
            'cost_price' => $this->toNumber($this->cell($row, 'cost_twd')),
            'wholesale_price' => $this->toNumber($this->cell($row, 'wholesale')),
            'retail_price' => $this->toNumber($this->cell($row, 'retail')),
            'image' => null,
            'supplier_id' => $supplierId,
            'type' => $this->cell($row, 'type'),
            'price' => $this->toNumber($this->cell($row, 'retail')),
            'stock_alert' => $this->cell($row, 'total'),
            'categories' => json_encode([]),
            'warehouses' => json_encode([]),
            'contents' => json_encode([]),
            'description' => $this->cell($row, 'remark'),
            'created_by' => $userId,
        ];
    }

    private function buildItemPayload(array $row, string $goodsId, string $sizeLabel, $userId): array
    {
        return [
            'goods_id' => $goodsId,
            'size' => $sizeLabel,
            'cup' => $this->nullIfEmpty($this->cell($row, 'cup')),
            'color' => $this->colorHelper->resolve($this->nullIfEmpty($this->cell($row, 'color'))),
            'barcode' => strtoupper(Str::random(12)),
            'cost_price' => $this->toNumber($this->cell($row, 'cost_twd')),
            'retail_price' => $this->toNumber($this->cell($row, 'retail')),
            'wholesale_price' => $this->toNumber($this->cell($row, 'wholesale')),
            'created_by' => $userId,
        ];
    }

    private function itemUniqueKey(string $size, ?string $color, ?string $cup): string
    {
        $safeColor = $color ?? '';
        $safeCup = $cup ?? '';
        return $size . '|' . $safeColor . '|' . $safeCup;
    }

    private function buildStockPayload(string $goodsId, string $goodsItemId, int $qty, float $unitPrice): array
    {
        $type = $qty > 0 ? 'PURCHASE' : ($qty < 0 ? 'SHIPPING' : 'PURCHASE');
        return [
            'goods_id' => $goodsId,
            'goods_item_id' => $goodsItemId,
            'unit' => $qty,
            'unit_price' => $unitPrice,
            'type' => $type,
            'synced_to_shopify' => false,
        ];
    }

    private function cell(array $row, string $key): string
    {
        $index = self::HEADER_INDEX[$key];

        return isset($row[$index]) ? trim((string) $row[$index]) : '';
    }

    private function toNumber(string $value): float
    {
        $normalized = str_replace([',', '$', ' '], '', $value);
        if ($normalized === '' || !is_numeric($normalized)) {
            return 0;
        }

        return (float) $normalized;
    }

    private function nullIfEmpty(string $value): ?string
    {
        return $value === '' ? null : $value;
    }

    private function emitProgress($callback, array $payload): void
    {
        if (is_callable($callback)) {
            $callback($payload);
        }
    }
}