<?php

namespace App\Console\Commands\Json\Form;

use App\Models\Goods\Category as CategoryModel;
use File;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class Category extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'json:category';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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

        try {
            $categories = CategoryModel::get();
            File::put(env('REACT_PATH') . 'src/json/form/category.json', $categories);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
        return 0;
    }
}