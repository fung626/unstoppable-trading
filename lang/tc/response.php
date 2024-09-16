<?php

return [
    'common' => [
        'fail' => [
            'server' => '伺服器錯誤',
            'database' => '資料庫錯誤',
            'data' => '沒有找到數據',
            'credentials' => '無效憑證',
            'parameter' => '無效參數',
            'unavailable' => '功能暫不可用',
            'upload' => '上傳失敗',
        ],
    ],
    'auth' => [
        'success' => [
            'register' => '註冊成功',
            'login' => '登入成功',
            'verification' => [
                'code' => [
                    'sent' => '驗證碼已發送',
                ],
            ],
            'resetpassword' => [
                'code' => [
                    'sent' => '驗證碼已發送',
                ],
            ],
        ],
        'fail' => [
            'login' => '無效登入',
            'register' => '無效注冊',
            'verify' => '無效驗證',
            'resetpassword' => [
                'code' => [
                    'sent' => '無效驗證',
                ],
            ],
            'verification' => [
                'code' => [
                    'send' => '驗證碼發送失敗',
                    'invalid' => '驗證碼無效',
                ],
            ],
            'exists' => [
                'user' => '用戶已存在',
                'email' => '電子郵件已存在',
                'phone' => '電話已經存在',
            ],
            'token' => [
                'expired' => '令牌已過期',
            ],
        ],
    ],
    'user' => [
        'success' => [
            'password' => '密碼重置成功',
        ],
        'fail' => [
            'password' => '指定的密碼與資料庫密碼不匹配',
            'found' => '找不到用戶',
            'verified' => '用戶未驗證',
        ],
    ],
    'goods' => [
        'fail' => [
            'supplier' => [
                'delete' => '刪除失敗，因為該供應商下方有一件或多件商品。',
            ],
        ],
    ],
];
