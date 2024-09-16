<?php

return [
    'common' => [
        'fail' => [
            'server' => 'server error',
            'database' => 'database error',
            'data' => 'no data found',
            'credentials' => 'invalid credentials',
            'parameter' => 'invalid parameter(s)',
            'unavailable' => 'function unavailable',
            'upload' => 'upload fail',
        ],
    ],
    'auth' => [
        'success' => [
            'register' => 'successfully register',
            'login' => 'successfully login',
            'verification' => [
                'code' => [
                    'sent' => 'verification code sent',
                ],
            ],
            'resetpassword' => [
                'code' => [
                    'sent' => 'verification code sent',
                ],
            ],
        ],
        'fail' => [
            'login' => 'invalid login',
            'register' => 'invalid register',
            'verify' => 'invalid verify',
            'resetpassword' => [
                'code' => [
                    'sent' => 'invalid verify',
                ],
            ],
            'verification' => [
                'code' => [
                    'send' => 'verification code fail to send',
                    'invalid' => 'invalid verification code',
                ],
            ],
            'exists' => [
                'user' => 'user already exists',
                'email' => 'email already exists',
                'phone' => 'phone already exists',
            ],
            'token' => [
                'expired' => 'token expired',
            ],
        ],
    ],
    'user' => [
        'success' => [
            'password' => 'password reset successfully',
        ],
        'fail' => [
            'password' => 'The specified password does not match the database password',
            'found' => 'user not found',
            'verified' => 'user not verified',
        ],
    ],
    'goods' => [
        'fail' => [
            'supplier' => [
                'delete' => 'Failed to delete, supplier is under one or more goods',
            ],
        ],
    ],
];
