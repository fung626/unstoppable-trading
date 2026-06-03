<?php

namespace App\Console\Commands\User\Employee;

use App\Models\User\Employee\MPF as MPFModel;
use App\Models\User\Users;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MPF extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'employee:mpf';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create employee MPF';

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
        $users = Users::with(['employee'])
            ->where(['role' => 'EMPLOYEE'])
            ->get();
        $now = Carbon::now();
        foreach ($users as $user) {
            if ($user->employee) {
                $exist = MPFModel::where([
                    'user_id' => $user->id,
                    'year' => $now->year,
                    'month' => $now->month,
                ])->first();
                if (!$exist) {
                    MPFModel::create([
                        'user_id' => $user->id,
                        'salary' => $user->employee->salary,
                        'employee_contribution' => $user->employee->employee_contribution,
                        'employer_contribution' => $user->employee->employer_contribution,
                        'working_days' => $now->daysInMonth,
                        'year' => $now->year,
                        'month' => $now->month,
                    ]);
                }
            }
        }
        return 0;
    }
}
