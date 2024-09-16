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
                'msg' => 'invalid credentials',
            ],
            'parameter' => [
                'error' => true,
                'code' => 1050,
                'msg' => 'invalid parameter(s)',
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
                'msg' => 'response.auth.success.register',
            ],
            'login' => [
                'error' => false,
                'code' => 0,
                'msg' => 'response.auth.success.login',
            ],
            'verification' => [
                'code' => [
                    'sent' => [
                        'error' => false,
                        'code' => 0,
                        'msg' => 'response.auth.success.verification.code.sent',
                    ],
                ],
            ],
            'resetpassword' => [
                'code' => [
                    'sent' => [
                        'error' => false,
                        'code' => 0,
                        'msg' => 'response.auth.success.resetpassword.code.sent',
                    ],
                ],
            ],
        ],
        'fail' => [
            'login' => [
                'error' => true,
                'code' => 2010,
                'msg' => 'response.auth.fail.login',
            ],
            'register' => [
                'error' => true,
                'code' => 2020,
                'msg' => 'response.auth.fail.register',
            ],
            'verify' => [
                'error' => true,
                'code' => 2030,
                'msg' => 'response.auth.fail.verify',
            ],
            'resetpassword' => [
                'code' => [
                    'sent' => [
                        'error' => true,
                        'code' => 2030,
                        'msg' => 'response.auth.fail.resetpassword.code.sent',
                    ],
                ],
            ],
            'verification' => [
                'code' => [
                    'send' => [
                        'error' => true,
                        'code' => 2040,
                        'msg' => 'response.auth.fail.verification.code.send',
                    ],
                    'invalid' => [
                        'error' => true,
                        'code' => 2050,
                        'msg' => 'response.auth.fail.verification.code.invalid',
                    ],
                ],
            ],
            'exists' => [
                'user' => [
                    'error' => true,
                    'code' => 2060,
                    'msg' => 'response.auth.fail.exists.user',
                ],
                'email' => [
                    'error' => true,
                    'code' => 2070,
                    'msg' => 'response.auth.fail.exists.email',
                ],
                'phone' => [
                    'error' => true,
                    'code' => 2080,
                    'msg' => 'response.auth.fail.exists.phone',
                ],
            ],
            'token' => [
                'expired' => [
                    'error' => true,
                    'code' => 2090,
                    'msg' => 'response.auth.fail.token.expired',
                ],
            ],
        ],
    ],
    'user' => [
        'success' => [
            'password' => [
                'error' => false,
                'code' => 0,
                'msg' => 'response.user.success.password',
            ],
        ],
        'fail' => [
            'password' => [
                'error' => true,
                'code' => 3010,
                'msg' => 'response.user.fail.password',
            ],
            'found' => [
                'error' => true,
                'code' => 3020,
                'msg' => 'response.user.fail.found',
            ],
            'verified' => [
                'error' => true,
                'code' => 3030,
                'msg' => 'response.user.fail.verified',
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
                    'msg' => 'response.goods.fail.item.exists',
                ],
                'delete' => [
                    'purchase' => [
                        'error' => true,
                        'msg' => 'response.goods.fail.item.delete.purchase',
                    ],
                    'stock' => [
                        'error' => true,
                        'msg' => 'response.goods.fail.item.delete.stock',
                    ],
                ],
            ],
            'supplier' => [
                'delete' => [
                    'error' => true,
                    'msg' => 'response.goods.fail.supplier.delete',
                ],
            ],
        ],
    ],
];
