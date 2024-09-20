<?php

namespace App\Http\Controllers\API\Goods\Shipping;

use App\Http\Controllers\Controller;
use App\Models\Goods\Shipping;
use App\Mylibs\Common;
use App\Mylibs\Goods as GoodsLib;
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

class InvoiceController extends Controller
{
    //
    protected $withs = [
        'shippingStocks',
        'shippingStocks.stock',
        'shippingStocks.stock.goods',
        'shippingStocks.stock.goodsItem',
    ];

    protected $status = [
        'PENDING',
        'PROCCESSING',
        'DELIVERED',
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

    public function export(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
            'extension' => 'required|string|in:pdf,docx',
        ]);

        if ($validator->fails()) {
            // dd($validator->errors());
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        $shipping = Shipping::with($this->withs)
            ->where(['id' => request('id')])
            ->first();

        $lang = 'tc';
        $template = 'shipping_invoice_' . $lang . '.docx';
        $domPdfPath = base_path('vendor/dompdf/dompdf');

        Settings::setPdfRendererName('DomPDF');
        Settings::setPdfRendererPath($domPdfPath);
        Settings::setOutputEscapingEnabled(true);

        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor(storage_path('app/template/' . $template));

        $subtotal = 0;
        $totalunit = 0;
        $discount = 'N/A';
        $taxes = 'N/A';
        $total = 0;

        $headerValues = [
            // header
            'name' => $shipping->client_name,
            'generated_id' => $shipping->generated_id,
            'date' => Carbon::parse($shipping->created_at)->format('Y-m-d'),
            'address' => $shipping->client_address,
            'phone' => Common::formatPhoneNumber($shipping->client_phone),
            'contact' => $shipping->client_contact,
            'company_name_tc' => config('constant.company.name.tc'),
            'company_name_en' => config('constant.company.name.en'),
            'company_phone' => Common::formatPhoneNumber(config('constant.company.phone')),
            'company_fax' => Common::formatPhoneNumber(config('constant.company.fax')),
            'company_email' => config('constant.company.email'),
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
        $table->addRow();
        foreach ($this->tableHeader as $key => $value) {
            // dd($value['width'], $value['text']);
            $table->addCell(Converter::pixelToTwip($value['width']), $headerStyle)->addText($value['text'], $headerFontStyle);
        }

        $shipItems = GoodsLib::formatShippingInvoiceItems($shipping);
        // $width = Converter::pixelToTwip(10500);
        $index = 0;
        foreach ($shipItems as $shipItem) {
            $sizes = config('constant.goods.sizes');
            $style = $index % 2 !== 0 ? ['bgColor' => 'F4F4F4'] : [];
            $fontStyle = ['size' => 10];
            $table->addRow();
            $table->addCell(Converter::pixelToTwip(40), $style)->addText($shipItem['type'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(50), $style)->addText($shipItem['name'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(50), $style)->addText($shipItem['cup'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(50), $style)->addText($shipItem['color'], $fontStyle);
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
                // dd($shipItem, $size, $shipItem[$size]);
                $table->addCell(Converter::pixelToTwip($widths[$subIndex]), $style)->addText($shipItem[$size] ? $shipItem[$size]['unit'] : '', $fontStyle);
                $subIndex++;
            }
            $table->addCell(Converter::pixelToTwip(40), $style)->addText($shipItem['total_unit'], $fontStyle);
            $table->addCell(Converter::pixelToTwip(90), $style)->addText($shipItem['unit_price'] ? Common::formatPrice($shipItem['unit_price']) : '', $fontStyle);
            $table->addCell(Converter::pixelToTwip(90), $style)->addText($shipItem['cost'] ? Common::formatPrice($shipItem['cost']) : '', $fontStyle);
            $totalunit += $shipItem['total_unit'];
            $subtotal += $shipItem['cost'];
            $index++;
        }

        $table->addRow();
        $table->addCell(null, ['gridSpan' => 10]);
        $table->addCell(null, ['gridSpan' => 2])->addText('清單總數:', $fontStyle);
        $table->addCell(null, ['gridSpan' => 2])->addText($totalunit, $fontStyle);

        $table->addRow();
        $table->addCell(null, ['gridSpan' => 10]);
        $table->addCell(null, ['gridSpan' => 2])->addText('清單總金額:', $fontStyle);
        $table->addCell(null, ['gridSpan' => 2])->addText($shipping->currency . ' ' . Common::formatPrice($subtotal), $fontStyle);

        $templateProcessor->setComplexBlock('{table}', $table);

        $now = Carbon::now()->format('Y-m-d_H:i:s');

        $docname = 'ship_invoice_' . $shipping->generated_id . '_' . $now;
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
