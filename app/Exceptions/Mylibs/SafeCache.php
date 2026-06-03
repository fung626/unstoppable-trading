<?php

namespace App\Mylibs;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class SafeCache
{

    private const RETRYABLE_CACHE_WRITE_ERROR_NEEDLE = 'No such file or directory';

    public static function get(string $key, $default = null)
    {
        try {
            return Cache::get($key, $default);
        } catch (\Throwable $e) {
            Log::warning('cache get failed: ' . $e->getMessage(), ['key' => $key]);
            return $default;
        }
    }

    public static function put(string $key, $value, $ttl = null): bool
    {
        return self::runSafeCacheWrite(function () use ($key, $value, $ttl) {
            return Cache::put($key, $value, $ttl);
        }, 'put', $key);
    }

    public static function add(string $key, $value, $ttl = null): bool
    {
        return self::runSafeCacheWrite(function () use ($key, $value, $ttl) {
            return Cache::add($key, $value, $ttl);
        }, 'add', $key);
    }

    public static function forget(string $key): bool
    {
        return self::runSafeCacheWrite(function () use ($key) {
            return Cache::forget($key);
        }, 'forget', $key);
    }

    private static function runSafeCacheWrite(callable $writer, string $operation, string $key): bool
    {
        try {
            return (bool) $writer();
        } catch (\Throwable $e) {
            if (!self::shouldRetryCacheWrite($e)) {
                Log::error('cache ' . $operation . ' failed: ' . $e->getMessage(), ['key' => $key]);
                return false;
            }

            self::ensureFileCachePath();

            try {
                return (bool) $writer();
            } catch (\Throwable $retryException) {
                Log::error('cache ' . $operation . ' retry failed: ' . $retryException->getMessage(), ['key' => $key]);
                return false;
            }
        }
    }

    private static function shouldRetryCacheWrite(\Throwable $e): bool
    {
        if (config('cache.default') !== 'file') {
            return false;
        }

        return strpos((string) $e->getMessage(), self::RETRYABLE_CACHE_WRITE_ERROR_NEEDLE) !== false;
    }

    private static function ensureFileCachePath(): void
    {
        $cachePath = (string) config('cache.stores.file.path', storage_path('framework/cache/data'));

        try {
            if (!File::exists($cachePath)) {
                File::makeDirectory($cachePath, 0755, true, true);
            }
        } catch (\Throwable $e) {
            Log::error('unable to ensure cache directory for goods import: ' . $cachePath . ' - ' . $e->getMessage());
        }
    }


}