<?php // Code within app\Helpers\Helper.php

namespace App\Mylibs;

class Chart
{
    public static function getStepping($steps, $min, $max)
    {
        $oMin = $min;
        $oMax = $max;
        $desiredSteps = $steps;
        $range = $max - $min;
        // find magnitude and steps in powers of 10
        $step = $range / $steps;
        $mag10 = ceil(log($step) / log(10));
        $baseStepSize = pow(10, $mag10);
        // find common divisions to get closer to desiredSteps
        $trySteps = [5, 4, 2, 1];
        for ($i = 0; $i < count($trySteps); ++$i) {
            $stepSize = $baseStepSize / $trySteps[$i];
            $ns = round($range / $stepSize);
            // bail if anything didn't work, We can't check float.ZeroTolernace anywhere since we should
            // work on arbitrary range values
            if (is_nan($baseStepSize) || is_nan($ns) || ($ns < 1)) {
                return;
            }
            $min = floor($oMin / $stepSize) * $stepSize;
            $max = ceil($oMax / $baseStepSizestepSize) * $stepSize;
            $steps = (int) round(($max - $min) / $stepSize);
            if ($steps <= $desiredSteps) {
                break;
            }
        }
        return $steps;
    }
}