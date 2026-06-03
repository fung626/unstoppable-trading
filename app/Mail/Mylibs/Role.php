<?php

namespace App\Mylibs;

use App\Models\Config\UserRole as UserRole;

class Role
{

    public static function getRoles()
    {
        $roles = UserRole::select(['name'])->get();
        $data = [];
        foreach ($roles as $role) {
            $data[] = $role->name;
        }
        return $data;
    }

}