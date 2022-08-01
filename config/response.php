<?php

return [
    'common' => [
        'fail' => [
            'server' => [
                'error' => true,
                'code' => 1010,
                'msg' => 'server error',
            ],
            'database' => [
                'error' => true,
                'code' => 1020,
                'msg' => 'database error',
            ],
            'data' => [
                'error' => true,
                'code' => 1030,
                'msg' => 'no data found',
            ],
            'credentials' => [
                'error' => true,
                'code' => 1040,
                'msg' => 'invaild credentials',
            ],
            'parameter' => [
                'error' => true,
                'code' => 1050,
                'msg' => 'invaild parameter(s)',
            ],
            'unavailable' => [
                'error' => true,
                'code' => 1060,
                'msg' => 'function unavailable',
            ],
            'upload' => [
                'error' => true,
                'code' => 1070,
                'msg' => 'upload fail',
            ],
        ],
        'success' => [
            'error' => false,
            'code' => 0,
        ],
    ],
    'auth' => [
        'success' => [
            'register' => [
                'error' => false,
                'code' => 0,
                'msg' => 'successfully register',
            ],
            'login' => [
                'error' => false,
                'code' => 0,
                'msg' => 'successfully login',
            ],
            'verification' => [
                'code' => [
                    'sent' => [
                        'error' => false,
                        'code' => 0,
                        'msg' => 'verification code sent',
                    ],
                ],
            ],
            'resetpassword' => [
                'code' => [
                    'sent' => [
                        'error' => false,
                        'code' => 0,
                        'msg' => 'verification code sent',
                    ],
                ],
            ],
        ],
        'fail' => [
            'login' => [
                'error' => true,
                'code' => 2010,
                'msg' => 'invalid login',
            ],
            'register' => [
                'error' => true,
                'code' => 2020,
                'msg' => 'invalid register',
            ],
            'verfiy' => [
                'error' => true,
                'code' => 2030,
                'msg' => 'invalid verfiy',
            ],
            'resetpassword' => [
                'code' => [
                    'sent' => [
                        'error' => true,
                        'code' => 2030,
                        'msg' => 'invalid verfiy',
                    ],
                ],
            ],
            'verification' => [
                'code' => [
                    'send' => [
                        'error' => true,
                        'code' => 2040,
                        'msg' => 'verification code fail to send',
                    ],
                    'invalid' => [
                        'error' => true,
                        'code' => 2050,
                        'msg' => 'invalid verification code',
                    ],
                ],
            ],
            'exists' => [
                'user' => [
                    'error' => true,
                    'code' => 2060,
                    'msg' => 'user already exists',
                ],
                'email' => [
                    'error' => true,
                    'code' => 2070,
                    'msg' => 'email already exists',
                ],
                'phone' => [
                    'error' => true,
                    'code' => 2080,
                    'msg' => 'phone already exists',
                ],
            ],
            'token' => [
                'expired' => [
                    'error' => true,
                    'code' => 2090,
                    'msg' => 'token expired',
                ],
            ],
        ],
    ],
    'user' => [
        'success' => [
            'password' => [
                'error' => false,
                'code' => 0,
                'msg' => 'password reset successfully',
            ],
        ],
        'fail' => [
            'password' => [
                'error' => true,
                'code' => 3010,
                'msg' => 'The specified password does not match the database password',
            ],
            'found' => [
                'error' => true,
                'code' => 3020,
                'msg' => 'user not found',
            ],
            'verified' => [
                'error' => true,
                'code' => 3030,
                'msg' => 'user not verified',
            ],
        ],
    ],
    'goods' => [
        'success' => [

        ],
        'fail' => [
            'item' => [
                'exists' => [
                    'error' => true,
                    'msg' => 'item exists',
                ],
                'delete' => [
                    'purchase' => [
                        'error' => true,
                        'msg' => 'purchase exists',
                    ],
                    'stock' => [
                        'error' => true,
                        'msg' => 'stock exists',
                    ],
                ],
            ],
            'supplier' => [
                'delete' => [
                    'error' => true,
                    'msg' => 'delete fail, supplier is under one or more goods',
                ],
            ],
        ],
    ],
];