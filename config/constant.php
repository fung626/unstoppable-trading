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
                'salesreport' => true,
                'user' => true,
                'goods' => true,
                'stock' => true,
                'purchase' => true,
                'shipping' => true,
                'supplier' => true,
                'category' => true,
                'warehouse' => true,
                'client' => true,
            ],
        ],
        [
            'value' => 'EMPLOYEE',
            'permissions' => [
                'salesreport' => false,
                'user' => false,
                'goods' => false,
                'stock' => false,
                'shipping' => false,
                'supplier' => false,
                'category' => false,
                'warehouse' => false,
                'client' => false,
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