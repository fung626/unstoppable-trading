<?php

namespace App\Mylibs;

use App\Models\User\Users;

class User
{

    public static function getId($length = 8)
    {
        $characters = '123456789';
        $string = '';
        for ($i = 0; $i < $length; $i++) {
            $string .= $characters[rand(0, $length - 1)];
        }
        $id = $string;
        $count = Users::where(['id' => $id])->count();
        if ($count > 0) {
            $id = self::getId();
        }
        return $id;
    }

}