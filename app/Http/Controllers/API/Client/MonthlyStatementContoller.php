<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Client;
use App\Models\Client\MonthlySettlement;
use App\Models\Goods\Shipping;
use App\Mylibs\Common;
use App\Mylibs\Statistics;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpWord\ComplexType\TblWidth as TblWidthComplexType;
use PhpOffice\PhpWord\Element\Table;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\Shared\Converter;
use PhpOffice\PhpWord\SimpleType\TblWidth;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Validator;

class MonthlyStatementContoller extends Controller
{
    //
    protected $tableHeader = [
        [
            'text' => '銷售單號',
            'width' => 254,
        ],
        [
            'text' => '送貨日期',
            'width' => 254,
        ],
        [
            'text' => '總金額',
            'width' => 254,
        ],
    ];

    public function __construct()
    {
        set_time_limit(8000000);
    }

    public function get(Request $request)
    {
        $data = [];
        $total_number_of_shipments = 0;
        $subtotal = 0;
        $months = Statistics::months($request->filled('period') ? request('period') : 6);
        $index = 0;

        foreach ($months as $x) {
            $result = Shipping::with([
                'shippingStocks',
                'shippingStocks.stock',
            ])->when($request->filled(['client_id']), function ($query) {
                $client_id = trim(request('client_id'));
                return $query->where(function ($query) use ($client_id) {
                    $query->where('client_id', $client_id);
                });
            })->whereYear('updated_at', '=', $x->year)
                ->whereMonth('updated_at', '=', $x->month)
                ->get();

            $amount = 0;
            $shippings = [];
            if (count($result) > 0) {
                $index = 0;
                foreach ($result as $y) {
                    $subTotal = 0;
                    if ($y->shippingStocks && count($y->shippingStocks) > 0) {
                        // dd($result);
                        foreach ($y->shippingStocks as $z) {
                            // dd($z->stock->unit_price, abs($z->stock->unit));
                            $amount += $z->stock->unit_price * abs($z->stock->unit);
                            $subTotal += $z->stock->unit_price * abs($z->stock->unit);
                        }
                        $shippings[] = [
                            'id' => $y->id,
                            'generated_id' => $y->generated_id,
                            'delivered_at' => $y->delivered_at,
                            'sub_total' => Common::formatPrice($subTotal),
                        ];
                    }
                }
            }

            $settlement = MonthlySettlement::where([
                'client_id' => request('client_id'),
                'month' => $x->month,
                'year' => $x->year,
            ])->first();

            $settled = $settlement && $settlement->settled ? true : false;
            $isFuture = Carbon::create($x->year, $x->month)->lastOfMonth()->isFuture();
            $subtotal += $amount;
            $total_number_of_shipments += count($shippings);

            $data[] = [
                'id' => $x->month . '_' . $x->year,
                'amount' => Common::formatPrice($amount),
                'date' => $x->month . '－' . $x->year,
                'month' => $x->month,
                'year' => $x->year,
                'number_of_shipments' => count($shippings),
                'shippings' => $shippings,
                'actions' => [
                    [
                        'key' => 1,
                        'title' => __("Export"),
                        'color' => "primary",
                        'type' => "Export",
                        'disabled' => count($shippings) > 0 ? false : true,
                    ],
                    [
                        'key' => 1,
                        'title' => $settled ? __("Settled") : __("Settle"),
                        'color' => $settled ? "success" : "info",
                        'type' => "Settle",
                        'disabled' => (count($shippings) <= 0 || $isFuture) ? true : ($settlement && $settlement->settled ? true : false),
                    ],
                ],
            ];
            $index += 1;
        }

        $response = config('response.common.success');
        $response['data'] = [
            'subtotal' => Common::formatPrice($subtotal),
            'total_number_of_shipments' => $total_number_of_shipments,
            'monthly_statements' => $data,
        ];
        return response()->json($response, 200);
    }

    public function post(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|string|exists:clients,id',
            'month' => 'required',
            'year' => 'required',
            'goods_shipping_ids' => 'required',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        try {

            $client = Client::where(['id' => request('client_id')])->first();

            MonthlySettlement::updateOrCreate([
                'client_id' => request('client_id'),
                'client_number' => $client->number,
                'month' => request('month'),
                'year' => request('year'),
            ], [
                'settled' => true,
                'goods_shipping_ids' => request('goods_shipping_ids'),
            ]);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $response = config('response.common.fail.database');
            return response()->json($response, 400);
        }

        $response = config('response.common.success');
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|string|exists:clients,id',
            'month' => 'required',
            'year' => 'required',
            'amount' => 'required',
            'extension' => 'required|string|in:pdf,docx',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            $response['data'] = $validator->errors();
            return response()->json($response, 400);
        }

        $client = Client::where(['id' => request('client_id')])->first();
        // dd($client);

        $lang = 'tc';
        $template = 'shipping_monthly_statement_' . $lang . '.docx';
        $domPdfPath = base_path('vendor/dompdf/dompdf');
        // dd(Settings::PDF_RENDERER_DOMPD);
        Settings::setPdfRendererName('DomPDF');
        Settings::setPdfRendererPath($domPdfPath);
        Settings::setOutputEscapingEnabled(true);
        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor(storage_path('app/template/' . $template));

        $headerValues = [
            // header
            'name' => $client->name,
            'number' => $client->number,
            'address' => $client->address,
            'phone' => $client->phone,
            'contact' => $client->contact,
            'name' => $client->name,
            'month' => request('month'),
            'date' => Carbon::now()->format('d-m-Y'),
        ];

        // dd($headerValues);
        foreach ($headerValues as $key => $value) {
            $templateProcessor->setValue($key, $value);
        }

        $indent = new TblWidthComplexType(-750, TblWidth::TWIP);
        $table = new Table([
            'borderSize' => 6,
            'borderColor' => 'BFBFBF',
            'indent' => $indent,
        ]);

        $headerStyle = ['bgColor' => 'FFFFFF'];
        $headerFontStyle = ['color' => '000000', 'size' => 10];
        $table->addRow(Converter::inchToTwip(0.4));
        foreach ($this->tableHeader as $key => $value) {
            // dd($value['width'], $value['text']);
            $table->addCell(Converter::pixelToTwip($value['width']), $headerStyle)->addText($value['text'], $headerFontStyle);
        }

        // dd($headerValues);
        $index = 0;
        foreach (request('shippings') as $value) {
            $style = $index % 2 !== 0 ? ['bgColor' => 'F4F4F4'] : [];
            $fontStyle = ['size' => 10];
            $table->addRow(Converter::inchToTwip(0.4));
            $table->addCell(Converter::pixelToTwip(254), $style)->addText($value['generated_id'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(254), $style)->addText(Carbon::parse($value['delivered_at'])->format('d-m-Y'), $fontStyle);
            $table->addCell(Converter::pixelToTwip(254), $style)->addText($value['sub_total'], $fontStyle);
            $index++;
        }

        if ($index < 9) {
            for ($i = 0; $i < 9 - $index; $i++) {
                $style = $i % 2 !== 0 ? ['bgColor' => 'F4F4F4'] : [];
                $fontStyle = ['size' => 10];
                $table->addRow(Converter::inchToTwip(0.4));
                $table->addCell(Converter::pixelToTwip(254), $style)->addText('', $fontStyle);
                $table->addCell(Converter::pixelToTwip(254), $style)->addText('', $fontStyle);
                $table->addCell(Converter::pixelToTwip(254), $style)->addText('', $fontStyle);
            }
        }

        $table->addRow(Converter::inchToTwip(0.4));
        $table->addCell(Converter::pixelToTwip(254), $style)->addText('', $fontStyle);
        $table->addCell(Converter::pixelToTwip(254), $style)->addText('本月總金額', $fontStyle);
        $table->addCell(Converter::pixelToTwip(254), $style)->addText(request('amount'), $fontStyle);

        $templateProcessor->setComplexBlock('{table}', $table);

        $now = Carbon::now()->format('Y-m-d_H:i:s');
        $docname = 'shipping_monthly_statement_' . $now;
        $path = storage_path('app/public/temp/' . $docname . '.docx');
        $templateProcessor->saveAs($path);

        if (request('extension') === 'pdf') {
            $outdir = storage_path('app/public/temp/');
            // $command = "libreoffice --headless --convert-to pdf $path --outdir $outdir";
            // $process = new Process(['libreoffice', '--headless', "--convert-to pdf $path", "--outdir $outdir"]);
            $process = new Process(["libreoffice", '--headless', '--convert-to', request('extension'), $path, '--outdir', $outdir]);
            // $process->run();
            try {
                $process->mustRun();
            } catch (ProcessFailedException $exception) {
                Log::error($exception->getMessage());
            }

            unlink($path); // delete the docx file manually
            $path = storage_path('app/public/temp/' . $docname . '.' . request('extension'));
        }

        return response()
            ->download($path)
            ->deleteFileAfterSend(true);
    }

}
