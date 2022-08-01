<?php

namespace App\Http\Controllers\API\Goods\Purchase;

use App\Http\Controllers\Controller;
use App\Models\Goods\Goods;
use App\Models\Goods\Purchase\Purchase;
use App\Mylibs\Common;
// use PhpOffice\PhpWord\SimpleType\TblWidth;
use App\Mylibs\Goods as GoodsLib;
// use PhpOffice\PhpWord\Writer\PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\ComplexType\TblWidth as TblWidthComplexType;
use PhpOffice\PhpWord\Element\Table;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\Shared\Converter;
use PhpOffice\PhpWord\SimpleType\TblWidth;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Validator;

class InvoiceController extends Controller
{

    //
    protected $withs = [
        'items',
        'items.goods',
        'users',
        'supplier',
    ];

    protected $tableHeader = [
        [
            'text' => '類別',
            'width' => 40,
        ],
        [
            'text' => '貨號',
            'width' => 50,
        ],
        [
            'text' => '罩杯',
            'width' => 50,
        ],
        [
            'text' => '顏色',
            'width' => 50,
        ],
        [
            'text' => '32-S',
            'width' => 50,
        ],
        [
            'text' => '34-M',
            'width' => 50,
        ],
        [
            'text' => '36-L',
            'width' => 50,
        ],
        [
            'text' => '38-XL',
            'width' => 50,
        ],
        [
            'text' => '40-Q',
            'width' => 50,
        ],
        [
            'text' => '42-EQ',
            'width' => 50,
        ],
        [
            'text' => '44-Free',
            'width' => 50,
        ],
        [
            'text' => '總數',
            'width' => 40,
        ],
        [
            'text' => '單價($)',
            'width' => 90,
        ],
        [
            'text' => '總額($)',
            'width' => 90,
        ],
    ];

    public function details(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $subtotal = 0;
        $totalunit = 0;
        $discount = 'N/A';
        $taxes = 'N/A';
        $total = 0;

        $purchase = Purchase::with($this->withs)
            ->where(['id' => request('id')])
            ->first();
        $invoiceHeaderItems = GoodsLib::formatPurchaseInvoiceHeaderItems($purchase);
        $purchaseItems = GoodsLib::formatPurchaseInvoiceItems(request('id'));

        foreach ($purchaseItems as $purchaseItem) {
            $totalunit += $purchaseItem['total_unit'];
            $subtotal += $purchaseItem['cost'];
        }

        $purchase->header_items = $invoiceHeaderItems;
        $purchase->footer_items = GoodsLib::formatPurchaseInvoiceFooterItems($purchase, $totalunit, $subtotal);
        $purchase->to_phone = Common::formatPhoneNumber($purchase->to_phone);
        $purchase->purchase_items = $purchaseItems;
        $purchase->total_unit = $totalunit;
        $purchase->discount = $discount;
        $purchase->taxes = $taxes;
        $purchase->subtotal = $subtotal;

        $response = config('response.common.success');
        // dd($result->toArray(), $purchaseItems[0]);
        $response['data'] = $purchase;
        return response()->json($response, 200);
    }

    public function items(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $items = GoodsLib::formatPurchaseInvoiceItems(request('id'));
        // dd($items);

        $response = config('response.common.success');
        // dd($results);
        $response['data'] = $items;
        return response()->json($response, 200);
    }

    public function export(Request $request)
    {
        // phpinfo();
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
            'extension' => 'required|string|in:pdf,docx',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $purchase = Purchase::with($this->withs)
            ->where('id', request('id'))
            ->first();
        $purchaseItems = GoodsLib::formatPurchaseInvoiceItems(request('id'));

        // dd($purchase->toArray());
        $lang = 'tc';
        $template = 'purchase_invoice_' . $lang . '.docx';
        $domPdfPath = base_path('vendor/dompdf/dompdf');
        // dd(Settings::PDF_RENDERER_DOMPD);
        Settings::setPdfRendererName('DomPDF');
        Settings::setPdfRendererPath($domPdfPath);
        Settings::setOutputEscapingEnabled(true);
        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor(storage_path('app/template/' . $template));
        $generator = new \Picqer\Barcode\BarcodeGeneratorPNG();
        $image = $generator->getBarcode($purchase->barcode, $generator::TYPE_CODE_128, 2, 32, [0, 0, 0]);
        Storage::disk('local')->put('public/temp/' . $purchase->barcode . '.png', $image);

        $templateProcessor->setImageValue('barcode_image', [
            'path' => storage_path('app/public/temp/' . $purchase->barcode . '.png'),
            'width' => 1028,
            'height' => 32,
            // 'ratio' => true,
        ]);

        $subtotal = 0;
        $totalunit = 0;
        $discount = 'N/A';
        $taxes = 'N/A';
        $total = 0;

        $headerValues = [
            // header
            'generated_id' => $purchase->generated_id,
            'name' => $purchase->to_company,
            'date' => Carbon::parse($purchase->created_at)->format('Y-m-d'),
            'address' => $purchase->to_address,
            'phone' => Common::formatPhoneNumber($purchase->to_phone),
            'contact' => $purchase->to_contact,
            'company_name_tc' => config('constant.company.name.tc'),
            'company_name_en' => config('constant.company.name.en'),
            'company_phone' => Common::formatPhoneNumber(config('constant.company.phone')),
            'company_fax' => Common::formatPhoneNumber(config('constant.company.fax')),
            'company_email' => config('constant.company.email'),
        ];
        // dd($headerValues);
        foreach ($headerValues as $key => $value) {
            $templateProcessor->setValue($key, $value);
        }

        $indent = new TblWidthComplexType(-320, TblWidth::TWIP);
        $table = new Table([
            'borderSize' => 6,
            'borderColor' => 'BFBFBF',
            'indent' => $indent,
        ]);

        $headerStyle = ['bgColor' => '182E54'];
        $headerFontStyle = ['color' => 'FFFFFF', 'size' => 10];
        $table->addRow();
        foreach ($this->tableHeader as $key => $value) {
            // dd($value['width'], $value['text']);
            $table->addCell(Converter::pixelToTwip($value['width']), $headerStyle)->addText($value['text'], $headerFontStyle);
        }

        $index = 0;
        foreach ($purchaseItems as $purchaseItem) {
            // dd($purchaseItem);
            // unit_price
            $sizes = config('constant.goods.sizes');
            $style = $index % 2 !== 0 ? ['bgColor' => 'F4F4F4'] : [];
            $fontStyle = ['size' => 10];
            $table->addRow();
            $table->addCell(Converter::pixelToTwip(40), $style)->addText($purchaseItem['type'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(50), $style)->addText($purchaseItem['name'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(50), $style)->addText($purchaseItem['cup'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(50), $style)->addText($purchaseItem['color'], $fontStyle);
            $widths = [
                50,
                50,
                50,
                50,
                50,
                50,
                50,
            ];
            $subIndex = 0;
            foreach ($sizes as $size) {
                // dd($purchaseItem, $size, $purchaseItem[$size]);
                $table->addCell(Converter::pixelToTwip($widths[$subIndex]), $style)->addText($purchaseItem[$size] ? $purchaseItem[$size]['unit'] : '', $fontStyle);
                $subIndex++;
            }
            $table->addCell(Converter::pixelToTwip(40), $style)->addText($purchaseItem['total_unit'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(90), $style)->addText($purchaseItem['unit_price'] ? Common::formatPrice($purchaseItem['unit_price']) : '', $fontStyle);
            $table->addCell(Converter::pixelToTwip(90), $style)->addText($purchaseItem['cost'] ? Common::formatPrice($purchaseItem['cost']) : '', $fontStyle);
            $totalunit += $purchaseItem['total_unit'];
            $subtotal += $purchaseItem['cost'];
            $index++;
        }

        $table->addRow();
        $table->addCell(null, ['gridSpan' => 10]);
        $table->addCell(null, ['gridSpan' => 2])->addText('清單總數:', $fontStyle);
        $table->addCell(null, ['gridSpan' => 2])->addText($totalunit, $fontStyle);

        $table->addRow();
        $table->addCell(null, ['gridSpan' => 10]);
        $table->addCell(null, ['gridSpan' => 2])->addText('清單總金額:', $fontStyle);
        $table->addCell(null, ['gridSpan' => 2])->addText($purchase->currency . ' ' . Common::formatPrice($subtotal), $fontStyle);

        $templateProcessor->setComplexBlock('{table}', $table);

        $now = Carbon::now()->format('Y-m-d_H:i:s');
        $docname = 'purchase_invoice_' . $purchase->id . '_' . $now;
        $path = storage_path('app/public/temp/' . $docname . '.docx');
        $templateProcessor->saveAs($path);
        // dd($path);
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