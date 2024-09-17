<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class ExportDataController extends Controller
{
    //

    public function post(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'rows' => 'required',
            'extension' => 'required|string|in:pdf,docx',
        ]);

        if ($validator->fails()) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        if (count(request('rows')) <= 0) {
            $response = config('response.common.fail.parameter');
            return response()->json($response, 400);
        }

        // $tableFullWidth = 10620;
        $tableFullWidth = 9500;
        $rows = request('rows');
        $headers = array_keys($rows[0]);

        $phpWord = new \PhpOffice\PhpWord\PhpWord();
        $section = $phpWord->addSection();
        // $header = ['size' => 16, 'bold' => true];
        // $section->addText('Goods', $header);
        $table = $section->addTable();
        $headerStyle = ['bgColor' => '182E54'];
        $headerFontStyle = ['color' => 'FFFFFF'];
        $table->addRow();
        $width = $tableFullWidth / count($headers);
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

        $now = Carbon::now()->format('Y-m-d_H:i:s');
        $docname = request('fileName') . '_' . $now;
        $path = storage_path('app/public/temp/' . $docname . '.docx');
        $phpWord->save($path);

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
