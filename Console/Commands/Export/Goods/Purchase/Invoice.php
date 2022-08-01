<?php

namespace App\Console\Commands\Export\Goods\Purchase;

use App\Models\Goods\Goods;
use App\Models\Goods\Purchase\Purchase;
use App\Mylibs\Common;
use App\Mylibs\Goods as GoodsLib;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpWord\ComplexType\TblWidth as TblWidthComplexType;
use PhpOffice\PhpWord\Element\Table;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\Shared\Converter;
use PhpOffice\PhpWord\SimpleType\TblWidth;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class Invoice extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'export:purchaseinvouce {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    //
    protected $withs = [
        'items',
        'items.goods',
    ];

    protected $tableHeader = [
        [
            'text' => '類別',
            'width' => 60,
        ],
        [
            'text' => '貨號',
            'width' => 120,
        ],
        [
            'text' => '罩杯',
            'width' => 60,
        ],
        [
            'text' => '顏色',
            'width' => 60,
        ],
        [
            'text' => '32-S',
            'width' => 60,
        ],
        [
            'text' => '34-M',
            'width' => 60,
        ],
        [
            'text' => '36-L',
            'width' => 60,
        ],
        [
            'text' => '38-XL',
            'width' => 60,
        ],
        [
            'text' => '40-Q',
            'width' => 60,
        ],
        [
            'text' => '42-EQ',
            'width' => 60,
        ],
        [
            'text' => '44-Free',
            'width' => 70,
        ],
        [
            'text' => '總數',
            'width' => 60,
        ],
        [
            'text' => '單價($)',
            'width' => 120,
        ],
        [
            'text' => '總額($)',
            'width' => 120,
        ],
    ];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $id = $this->argument('id');
        $lang = 'tc';
        $template = 'invoice_' . $lang . '.docx';
        $domPdfPath = base_path('vendor/dompdf/dompdf');
        // dd(Settings::PDF_RENDERER_DOMPD);
        Settings::setPdfRendererName('DomPDF');
        Settings::setPdfRendererPath($domPdfPath);
        Settings::setOutputEscapingEnabled(true);

        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor(storage_path('app/template/' . $template));

        $purchase = Purchase::with($this->withs)
            ->where('id', $id)
            ->first();
        $purchaseItems = GoodsLib::formatPurchaseInvoiceItems($id);

        $subtotal = 0;
        $totalunit = 0;
        $discount = 'N/A';
        $taxes = 'N/A';
        $total = 0;

        $headerValues = [
            // header
            'to_company_name' => $purchase->to_company,
            'invoice_id' => $purchase->id,
            'date' => Carbon::parse($purchase->created_at)->format('Y-m-d'),
            'to_address' => $purchase->to_address,
            'to_phone' => Common::formatPhoneNumber($purchase->to_phone) . ' (' . $purchase->to_company . ')',
            'company_phone' => Common::formatPhoneNumber(config('constant.company.phone')),
            'company_fax' => Common::formatPhoneNumber(config('constant.company.fax')),
            'company_email' => config('constant.company.email'),
        ];

        $indent = new TblWidthComplexType(-700, TblWidth::TWIP);
        $table = new Table([
            'borderSize' => 6,
            'borderColor' => 'BFBFBF',
            'indent' => $indent,
        ]);

        $headerStyle = ['bgColor' => '182E54'];
        $headerFontStyle = ['color' => 'FFFFFF'];
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
            $table->addRow();
            $table->addCell(Converter::pixelToTwip(60), $style)->addText($purchaseItem['type']);
            $table->addCell(Converter::pixelToTwip(60), $style)->addText($purchaseItem['name']);
            $table->addCell(Converter::pixelToTwip(60), $style)->addText($purchaseItem['cup']);
            $table->addCell(Converter::pixelToTwip(60), $style)->addText($purchaseItem['color']);
            $widths = [
                60,
                60,
                60,
                60,
                60,
                60,
                70,
            ];
            $subIndex = 0;
            foreach ($sizes as $size) {
                // dd($purchaseItem, $size, $purchaseItem[$size]);
                $table->addCell(Converter::pixelToTwip($widths[$subIndex]), $style)->addText($purchaseItem[$size] ? $purchaseItem[$size]['unit'] : "");
                $subIndex++;
            }
            $table->addCell(Converter::pixelToTwip(60), $style)->addText($purchaseItem['total_unit']);
            $table->addCell(Converter::pixelToTwip(120), $style)->addText('$' . Common::formatPrice($purchaseItem['unit_price']));
            $table->addCell(Converter::pixelToTwip(120), $style)->addText('$' . Common::formatPrice($purchaseItem['total_cost']));
            $totalunit += $purchaseItem['total_unit'];
            $subtotal += $purchaseItem['total_cost'];
            $index++;
        }

        $table->addRow();
        $table->addCell(null, ['gridSpan' => 10]);
        $table->addCell(null, ['gridSpan' => 2])->addText('清單總數:');
        $table->addCell(null, ['gridSpan' => 2])->addText($totalunit);

        $table->addRow();
        $table->addCell(null, ['gridSpan' => 10]);
        $table->addCell(null, ['gridSpan' => 2])->addText('清單總金額:');
        $table->addCell(null, ['gridSpan' => 2])->addText($purchase->currency . ' $' . Common::formatPrice($subtotal));

        $templateProcessor->setComplexBlock('{table}', $table);

        // $now = Carbon::now()->format('Y-m-d_H:i:s');
        $docname = 'purchase_invoice_' . $purchase->id;
        $path = storage_path('app/public/word/' . $docname . '.docx');
        $templateProcessor->saveAs($path);

        $outdir = storage_path('app/public/pdf/');
        // $command = "libreoffice --headless --convert-to pdf $path --outdir $outdir";
        // $process = new Process(['libreoffice', '--headless', "--convert-to pdf $path", "--outdir $outdir"]);
        $process = new Process(["libreoffice", '--headless', '--convert-to', 'pdf', $path, '--outdir', $outdir]);
        // $process->run();
        try {
            $process->mustRun();
        } catch (ProcessFailedException $exception) {
            Log::error($exception->getMessage());
        }

        return 0;
    }
}