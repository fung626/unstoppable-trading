<?php

return [
    'company' => [
        'name' => [
            'en' => 'Unstoppable Trading',
            'tc' => '永行貿易有限公司',
        ],
        'phone' => '35686844',
        'fax' => ' 35686344',
        'email' => 'Unstoppable_Trading@hotmail.com',
    ],
    'currencies' => [
        'HKD',
        'TWD',
    ],
    'roles' => [
        [
            'value' => 'ADMIN',
            'permissions' => [
                'sales-report' => true,
                'users' => true,
                'goods' => true,
                'stocks' => true,
                'purchases' => true,
                'shippings' => true,
                'suppliers' => true,
                'categories' => true,
                'warehouses' => true,
                'clients' => true,
            ],
        ],
        [
            'value' => 'EMPLOYEE',
            'permissions' => [
                'sales-reports' => false,
                'users' => false,
                'goods' => false,
                'stocks' => false,
                'shippings' => false,
                'suppliers' => false,
                'categories' => false,
                'warehouses' => false,
                'clients' => false,
            ],
        ],
    ],
    'goods' => [
        'cups' => [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
        ],
        'sizes' => [
            '32-S',
            '34-M',
            '36-L',
            '38-XL',
            '40-Q',
            '42-EQ',
            '44-Free',
        ],
        'colors' => [
            '白色',
            '銀色',
            '灰色',
            '黑色',
            '藍色',
            '藍綠色',
            '青色',
            '綠色',
            '黃色',
            '橙色',
            '棕色',
        ],
    ],
];
