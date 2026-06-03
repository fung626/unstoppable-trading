<?php

namespace App\Http\Controllers\API\Goods\Shipping;

use App\Http\Controllers\Controller;
use App\Models\Goods\Shipping;
use App\Mylibs\Common;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpWord\ComplexType\TblWidth as TblWidthComplexType;
use PhpOffice\PhpWord\Element\Table;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\Shared\Converter;
use PhpOffice\PhpWord\SimpleType\TblWidth;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class MonthlyStatementController extends Controller
{
    protected $withs = [
        'shippingStocks',
        'shippingStocks.stock',
        'shippingStocks.stock.goods',
        'shippingStocks.stock.goodsItem',
    ];

    protected $tableHeader = [
        [
            'text' => '單據號碼',
            'width' => 140,
        ],
        [
            'text' => '送貨日期:(YYY/MM/DD)',
            'width' => 230,
        ],
        [
            'text' => '單額:($HKD)',
            'width' => 220,
        ],
    ];

    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        [$items, $summary] = $this->buildMonthlyStatementData($request);

        $response = config('response.common.success');
        $response['data'] = [
            'items' => $items,
            'summary' => $summary,
        ];

        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|string',
            'month' => 'required|date_format:Y-m',
            'extension' => 'required|string|in:pdf,docx',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        [$rows, $exportSummary, $shipping] = $this->buildMonthlyStatementExportRows($request);

        $monthText = Carbon::createFromFormat('Y-m', request('month'))->format('n');

        $template = 'shipping_monthly_statement_tc.docx';
        $domPdfPath = base_path('vendor/dompdf/dompdf');

        Settings::setPdfRendererName('DomPDF');
        Settings::setPdfRendererPath($domPdfPath);
        Settings::setOutputEscapingEnabled(true);

        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor(storage_path('app/template/' . $template));

        $headerValues = [
            'month' => $monthText,
            'name' => $shipping ? $shipping->client_name : '-',
            'number' => $shipping ? $shipping->number : '-',
            'date' => Carbon::now()->format('d-m-Y'),
            'address' => $shipping ? $shipping->client_address : '-',
            'phone' => $shipping ? Common::formatPhoneNumber($shipping->client_phone) : '-',
            'contact' => $shipping ? $shipping->client_contact : '-',
        ];

        foreach ($headerValues as $key => $value) {
            $templateProcessor->setValue($key, $value);
        }

        $indent = new TblWidthComplexType(-180, TblWidth::TWIP);
        $table = new Table([
            'borderSize' => 6,
            'borderColor' => 'BFBFBF',
            'indent' => $indent,
        ]);

        $headerStyle = ['bgColor' => '182E54'];
        $headerFontStyle = ['color' => 'FFFFFF', 'size' => 10];
        $fontStyle = ['size' => 10];

        $table->addRow();
        foreach ($this->tableHeader as $column) {
            $table->addCell(Converter::pixelToTwip($column['width']), $headerStyle)->addText($column['text'], $headerFontStyle);
        }

        $index = 0;
        foreach ($rows as $row) {
            $style = $index % 2 !== 0 ? ['bgColor' => 'F4F4F4'] : [];

            $table->addRow();
            $table->addCell(Converter::pixelToTwip(140), $style)->addText($row['number'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(230), $style)->addText($row['date'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(220), $style)->addText(Common::formatPrice($row['amount']), $fontStyle);
            $index++;
        }

        $table->addRow();
        $table->addCell(Converter::pixelToTwip(370), ['gridSpan' => 2])->addText('本月總額', $fontStyle);
        $table->addCell(Converter::pixelToTwip(220))->addText('$' . Common::formatPrice($exportSummary['total_amount']), $fontStyle);

        $templateProcessor->setComplexBlock('{table}', $table);

        $now = Carbon::now()->format('Y-m-d_H:i:s');
        $clientRef = $shipping ? $shipping->client_number : request('client_id');
        $docname = 'shipping_monthly_statement_' . $clientRef . '_' . $now;
        $path = storage_path('app/public/temp/' . $docname . '.docx');
        $templateProcessor->saveAs($path);

        if (request('extension') === 'pdf') {
            $outdir = storage_path('app/public/temp/');
            $process = new Process(['libreoffice', '--headless', '--convert-to', request('extension'), $path, '--outdir', $outdir]);
            try {
                $process->mustRun();
            } catch (ProcessFailedException $exception) {
                $response = config('response.common.fail.parameter');
                $response['msg'] = $exception->getMessage();
                return response()->json($response, 500);
            }
            unlink($path);
            $path = storage_path('app/public/temp/' . $docname . '.' . request('extension'));
        }

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

    private function buildMonthlyStatementExportRows(Request $request)
    {
        $query = Shipping::query()
            ->from('goods_shippings')
            ->leftJoin(
                'goods_stock_shippings as shipping_stocks',
                'shipping_stocks.goods_shipping_id',
                '=',
                'goods_shippings.id'
            )
            ->leftJoin(
                'goods_stocks as stocks',
                'stocks.id',
                '=',
                'shipping_stocks.goods_shipping_stock_id'
            )
            ->where('goods_shippings.client_id', request('client_id'))
            ->where('goods_shippings.status', '!=', 'DELETED')
            ->whereRaw("DATE_FORMAT(goods_shippings.created_at, '%Y-%m') = ?", [request('month')])
            ->select([
                'goods_shippings.id',
                'goods_shippings.number',
                'goods_shippings.client_number',
                'goods_shippings.client_name',
                'goods_shippings.client_address',
                'goods_shippings.client_phone',
                'goods_shippings.client_contact',
                'goods_shippings.created_at',
            ])
            ->selectRaw('COALESCE(SUM(ABS(stocks.unit) * stocks.unit_price), 0) as total_amount')
            ->groupBy([
                'goods_shippings.id',
                'goods_shippings.number',
                'goods_shippings.client_number',
                'goods_shippings.client_name',
                'goods_shippings.client_address',
                'goods_shippings.client_phone',
                'goods_shippings.client_contact',
                'goods_shippings.created_at',
            ])
            ->orderBy('goods_shippings.number', 'ASC');

        $records = $query->get();
        $rows = [];
        $summary = [
            'total_amount' => 0,
        ];

        foreach ($records as $record) {
            $amount = (float) $record->total_amount;
            $rows[] = [
                'number' => $record->client_number . '-' . sprintf('%08d', $record->number),
                'date' => Carbon::parse($record->created_at)->format('Y-m-d'),
                'amount' => $amount,
            ];
            $summary['total_amount'] += $amount;
        }

        return [$rows, $summary, $records->first()];
    }

    private function buildMonthlyStatementBaseQuery(Request $request)
    {
        return Shipping::query()
            ->from('goods_shippings')
            ->leftJoin(
                'goods_stock_shippings as shipping_stocks',
                'shipping_stocks.goods_shipping_id',
                '=',
                'goods_shippings.id'
            )
            ->leftJoin(
                'goods_stocks as stocks',
                'stocks.id',
                '=',
                'shipping_stocks.goods_shipping_stock_id'
            )
            ->where('goods_shippings.client_id', request('client_id'))
            ->where('goods_shippings.status', '!=', 'DELETED')
            ->when($request->filled('from_date'), function ($query) {
                $query->whereDate('goods_shippings.created_at', '>=', request('from_date'));
            })
            ->when($request->filled('to_date'), function ($query) {
                $query->whereDate('goods_shippings.created_at', '<=', request('to_date'));
            })
            ->selectRaw("DATE_FORMAT(goods_shippings.created_at, '%Y-%m') as month")
            ->selectRaw("DATE_FORMAT(goods_shippings.created_at, '%M %Y') as month_label")
            ->selectRaw('COUNT(DISTINCT goods_shippings.id) as shipments')
            ->selectRaw('COALESCE(SUM(ABS(stocks.unit)), 0) as total_units')
            ->selectRaw('COALESCE(SUM(ABS(stocks.unit) * stocks.unit_price), 0) as total_amount')
            ->groupBy('month', 'month_label');
    }

    private function applyMonthlyStatementSorting(Request $request, $query)
    {
        $sortBys = request('sort_by', request('sortBy', []));
        $sortDescs = request('sort_desc', request('sortDesc', []));
        $sortableMap = [
            'month' => 'month',
            'month_label' => 'month_label',
            'monthLabel' => 'month_label',
            'shipments' => 'shipments',
            'total_units' => 'total_units',
            'totalUnits' => 'total_units',
            'total_amount' => 'total_amount',
            'amount' => 'total_amount',
            'actions' => null,
        ];

        $hasSort = false;
        if (is_array($sortBys) && is_array($sortDescs)) {
            $index = 0;
            foreach ($sortBys as $sortBy) {
                if (!array_key_exists($sortBy, $sortableMap) || $sortableMap[$sortBy] === null) {
                    $index++;
                    continue;
                }

                $query->orderBy(
                    $sortableMap[$sortBy],
                    filter_var($sortDescs[$index] ?? false, FILTER_VALIDATE_BOOLEAN) ? 'DESC' : 'ASC'
                );
                $hasSort = true;
                $index++;
            }
        }

        if (!$hasSort) {
            $query->orderBy('month', 'DESC');
        }
    }

    private function buildMonthlyStatementData(Request $request)
    {
        $query = $this->buildMonthlyStatementBaseQuery($request);
        $this->applyMonthlyStatementSorting($request, $query);

        $items = $query->get()->map(function ($row) {
            return [
                'month' => $row->month,
                'month_label' => $row->month_label,
                'shipments' => (int) $row->shipments,
                'total_units' => (int) $row->total_units,
                'total_amount' => (float) $row->total_amount,
            ];
        })->values()->all();

        $summary = [
            'shipments' => 0,
            'total_units' => 0,
            'total_amount' => 0,
        ];

        foreach ($items as $item) {
            $summary['shipments'] += $item['shipments'];
            $summary['total_units'] += $item['total_units'];
            $summary['total_amount'] += $item['total_amount'];
        }

        return [$items, $summary];
    }
}