<?php

namespace App\Mylibs;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpWord\ComplexType\TblWidth as TblWidthComplexType;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\SimpleType\TblWidth;
use Symfony\Component\Process\Process;

class MyPhpOffice
{

    // protected static $tableFullWidth = 9500;

    // protected static $tableHorizontalWidth = 10500;

    protected static $tableVerticalWidth = 10500;

    protected static $tempPath = 'app/public/temp/';

    public static function setArrayValue($templateProcessor, $key, $array, $count)
    {
        $y = 1;
        for ($x = 0; $x <= $count; $x++) {
            if (count($array) > $x && $array[$x]) {
                $templateProcessor->setValue($key . '' . $y, $array[$x]);
                $y++;
            }
        }
        $z = $y;
        for ($x = $y - 1; $x <= $count; $x++) {
            // dd($z, $x);
            Log::debug($key . '' . $z);
            Log::debug($x);
            $templateProcessor->setValue($key . '' . $z, '');
            $z++;
        }
    }

    public static function exportTableWithPath($name, $rows, $headers, $extension = 'pdf')
    {
        $phpWord = new \PhpOffice\PhpWord\PhpWord();
        $section = $phpWord->addSection();
        $header = ['size' => 16, 'bold' => true];
        $section->addText(ucfirst($name), $header);
        $table = $section->addTable();
        $headerStyle = ['bgColor' => '182E54'];
        $headerFontStyle = ['color' => 'FFFFFF'];
        $table->addRow();
        $width = self::$tableVerticalWidth / count($headers);
        foreach ($headers as $key => $value) {
            $table->addCell($width, $headerStyle)->addText($value, $headerFontStyle);
        }

        $index = 0;
        foreach ($rows as $row) {
            $table->addRow();
            foreach ($row as $key => $value) {
                $style = $index % 2 !== 0 ? ['bgColor' => 'F4F4F4'] : [];
                $table->addCell($width, $style)->addText($value);
            }
            $index++;
        }

        $now = Carbon::now()->format('Y-m-d_His');
        $docname = 'export_' . strtolower($name) . '_table_' . $now;
        $path = storage_path(self::$tempPath . $docname . '.docx');
        // dd($path);

        $phpWord->save($path);

        if ($extension === 'pdf') {
            $outdir = storage_path(self::$tempPath);
            // $command = "libreoffice --headless --convert-to pdf $path --outdir $outdir";
            // $process = new Process(['libreoffice', '--headless', "--convert-to pdf $path", "--outdir $outdir"]);
            $process = new Process(["libreoffice", '--headless', '--convert-to', $extension, $path, '--outdir', $outdir]);
            // $process->run();
            try {
                $process->mustRun();
            } catch (ProcessFailedException $exception) {
                Log::error($exception->getMessage());
            }

            unlink($path); // delete the docx file manually
            $path = storage_path(self::$tempPath . $docname . '.' . $extension);
        }
        // dd($path);
        return $path;
    }

    public static function exportPackingWithPath($name, $data = [], $extension = 'pdf')
    {
        $template = 'ship_mailer.docx';
        $domPdfPath = base_path('vendor/dompdf/dompdf');

        Settings::setPdfRendererName('DomPDF');
        Settings::setPdfRendererPath($domPdfPath);
        Settings::setOutputEscapingEnabled(true);

        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor(storage_path('app/template/' . $template));

        foreach ($data as $key => $value) {
            $templateProcessor->setValue($key, $value);
        }

        $now = Carbon::now()->format('Y-m-d_H:i:s');

        $docname = 'ship_mailer_' . $name . '_' . $now;
        $path = storage_path(self::$tempPath . $docname . '.docx');
        $templateProcessor->saveAs($path);
        // dd($path);
        if ($extension === 'pdf') {
            $outdir = storage_path(self::$tempPath);
            // $command = "libreoffice --headless --convert-to pdf $path --outdir $outdir";
            // $process = new Process(['libreoffice', '--headless', "--convert-to pdf $path", "--outdir $outdir"]);
            $process = new Process(["libreoffice", '--headless', '--convert-to', request('extension'), $path, '--outdir', $x]);
            // $process->run();
            try {
                $process->mustRun();
            } catch (ProcessFailedException $exception) {
                Log::error($exception->getMessage());
            }
            unlink($path); // delete the docx file manually
            $path = storage_path(self::$tempPath . $docname . '.' . request('extension'));
        }

        return $path;

    }

    public static function exportMailerWithPath($name, $data, $extension = 'pdf')
    {
        $repeat = 4;
        $fontStyle = ['size' => 20];

        $tbRlCellRowSpan = [
            'vMerge' => 'restart',
            'borderColor' => 'BFBFBF',
            'borderSize' => 6,
            'textDirection' => 'tbRl',
        ];

        $cellRowSpan = [
            'vMerge' => 'restart',
            'borderColor' => 'BFBFBF',
            'borderSize' => 6,
        ];
        $cellRowContinue = [
            'vMerge' => 'continue',
            'borderColor' => 'BFBFBF',
            'borderSize' => 6,
        ];
        $cellColSpan = [
            'gridSpan' => 2,
            'borderColor' => 'BFBFBF',
            'borderSize' => 6,
        ];

        $indent = new TblWidthComplexType(-600, TblWidth::TWIP);
        $phpWord = new \PhpOffice\PhpWord\PhpWord();
        // $tableFullWidth = 10500;

        $section = $phpWord->addSection();
        $table = $section->addTable([
            'indent' => $indent,
        ]);

        for ($x = 1; $x <= $repeat; $x++) {
            $table->addRow();
            $table->addCell(self::$tableVerticalWidth * 0.2, $cellRowSpan)->addText(__('Client'), $fontStyle);
            $table->addCell(self::$tableVerticalWidth * 0.7, $cellRowSpan)->addText($data['name'], $fontStyle);
            $table->addCell(self::$tableVerticalWidth * 0.1, $tbRlCellRowSpan)->addText('請回單', $fontStyle, ['align' => 'center', 'valign' => 'center']);

            $table->addRow();
            $table->addCell(self::$tableVerticalWidth * 0.2, $cellRowSpan)->addText(__('Address'), $fontStyle);
            $table->addCell(self::$tableVerticalWidth * 0.7, $cellRowSpan)->addText($data['address'], $fontStyle);
            $table->addCell(self::$tableVerticalWidth * 0.1, $cellRowContinue);

            $table->addRow();
            $table->addCell(self::$tableVerticalWidth * 0.2, $cellRowSpan)->addText(__('Phone'), $fontStyle);
            $table->addCell(self::$tableVerticalWidth * 0.3, $cellRowSpan)->addText($data['phone'], $fontStyle);
            $table->addCell(self::$tableVerticalWidth * 0.2, $cellRowSpan)->addText(__('Contact'), $fontStyle);
            $table->addCell(self::$tableVerticalWidth * 0.2, $cellRowSpan)->addText($data['contact'], $fontStyle);
            $table->addCell(self::$tableVerticalWidth * 0.1, $cellRowContinue);

            $table->addRow();
            $table->addCell(self::$tableVerticalWidth, $cellRowSpan)->addText(__('Remark'), $fontStyle);

            $table->addRow();
            $table->addCell(self::$tableVerticalWidth, $cellRowSpan)->addText(config('constant.company.name.ch'), $fontStyle);

            $table->addRow();
            $table->addCell(self::$tableVerticalWidth, $cellRowSpan)->addText(__('Phone') . ': ' . Common::formatPhoneNumber(config('constant.company.phone')) . ' ' . __('Fax') . ': ' . Common::formatPhoneNumber(config('constant.company.fax')), $fontStyle);

            $table->addRow();
            $table->addCell(self::$tableVerticalWidth);
        }

        $now = Carbon::now()->format('Y-m-d_H:i:s');
        $docname = 'export_' . strtolower($name) . $now;
        $path = storage_path(self::$tempPath . $docname . '.docx');
        $phpWord->save($path);

        if ($extension === 'pdf') {
            $outdir = storage_path(self::$tempPath);
            // $command = "libreoffice --headless --convert-to pdf $path --outdir $outdir";
            // $process = new Process(['libreoffice', '--headless', "--convert-to pdf $path", "--outdir $outdir"]);
            $process = new Process(["libreoffice", '--headless', '--convert-to', $extension, $path, '--outdir', $outdir]);
            // $process->run();
            try {
                $process->mustRun();
            } catch (ProcessFailedException $exception) {
                Log::error($exception->getMessage());
            }

            unlink($path); // delete the docx file manually
            $path = storage_path(self::$tempPath . $docname . '.' . $extension);
        }

        return $path;
    }

}
