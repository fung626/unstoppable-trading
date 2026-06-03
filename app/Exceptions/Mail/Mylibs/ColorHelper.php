<?php

namespace App\Mylibs;

/**
 * ColorHelper
 *
 * Resolves and normalizes product colors using fuzzy matching against
 * the allowed colors defined in config/constant.php (constant.goods.colors).
 *
 * Features:
 * - Exact matching
 * - Normalized matching (removes spaces, trailing 色 character)
 * - Fuzzy matching with text containment
 * - Multibyte-safe string operations (for CJK characters)
 * - Cached color lists for performance
 */
class ColorHelper
{
    /** @var ?array<string> Cached list of allowed colors from config */
    private ?array $allowedColors = null;

    /** @var ?array<string, string> Cached normalized -> original color index */
    private ?array $normalizedColorIndex = null;

    /**
     * Resolve a color by matching against allowed colors from config/constant.php.
     *
     * Attempts to match in this order:
     * 1. Exact match (case-sensitive)
     * 2. Normalized match (spaces and trailing 色 removed)
     * 3. Falls back to the input value if no match found
     *
     * @param ?string $color Raw color value from CSV or input
     * @return ?string Resolved color name or null if empty
     */
    public function resolve(?string $color): ?string
    {
        if ($color === null) {
            return null;
        }

        $raw = trim($color);
        if ($raw === '') {
            return null;
        }

        $allowedColors = $this->getAllowedColors();
        if (empty($allowedColors)) {
            return $raw;
        }

        // Exact match
        if (in_array($raw, $allowedColors, true)) {
            return $raw;
        }

        // Normalized match (removes spaces and trailing 色)
        $normalizedRaw = $this->normalize($raw);
        if ($normalizedRaw === '') {
            return $raw;
        }

        // Check normalized index for a match
        $normalizedIndex = $this->getNormalizedColorIndex();
        if (isset($normalizedIndex[$normalizedRaw])) {
            return $normalizedIndex[$normalizedRaw];
        }

        // If normalization changed the input and it exists in constants, return it
        if ($normalizedRaw !== $raw && in_array($normalizedRaw, $allowedColors, true)) {
            return $normalizedRaw;
        }

        // No match found, return original input
        return $raw;
    }

    /**
     * Get allowed colors from config/constant.php.
     *
     * Reads from: config('constant.goods.colors')
     * Configuration file: config/constant.php
     * Array key: 'goods' => ['colors' => [...]]
     *
     * @return array<string> List of allowed color names
     */
    public function getAllowedColors(): array
    {
        if ($this->allowedColors !== null) {
            return $this->allowedColors;
        }

        $colors = config('constant.goods.colors', []);
        if (!is_array($colors)) {
            $this->allowedColors = [];
            return $this->allowedColors;
        }

        $this->allowedColors = array_values(array_filter(array_map(function ($value) {
            return trim((string) $value);
        }, $colors), function ($value) {
            return $value !== '';
        }));

        return $this->allowedColors;
    }

    /**
     * Normalize text for color matching.
     *
     * Normalization rules:
     * - Removes all whitespace (including multi-byte spaces)
     * - Removes trailing 色 character (used in Chinese color names)
     * - Trims remaining whitespace
     *
     * Example: "  深 紅  色  " → "深紅"
     *
     * @param string $text Raw text to normalize
     * @return string Normalized text for comparison
     */
    public function normalize(string $text): string
    {
        $normalized = trim(preg_replace('/\s+/u', '', $text) ?? '');
        $normalized = preg_replace('/色$/u', '', $normalized) ?? $normalized;
        return trim($normalized);
    }

    /**
     * Check if haystack contains needle (multibyte-safe).
     *
     * Uses mb_strpos if available, falls back to strpos for ASCII.
     * Supports CJK and other multibyte character sets.
     *
     * @param string $haystack Text to search in
     * @param string $needle Text to search for
     * @return bool True if needle is found in haystack
     */
    public function contains(string $haystack, string $needle): bool
    {
        if ($needle === '') {
            return false;
        }

        if (function_exists('mb_strpos')) {
            return mb_strpos($haystack, $needle) !== false;
        }

        return strpos($haystack, $needle) !== false;
    }

    /**
     * Get string length (multibyte-safe).
     *
     * Uses mb_strlen if available, falls back to strlen for ASCII.
     * Properly counts CJK characters as single characters.
     *
     * @param string $value Text to measure
     * @return int Character count (not byte count)
     */
    public function length(string $value): int
    {
        if (function_exists('mb_strlen')) {
            return mb_strlen($value);
        }

        return strlen($value);
    }

    /**
     * Get normalized color index for fast lookup.
     *
     * Builds a map of normalized color names to their original values.
     * Used for quick O(1) lookups during color resolution.
     *
     * @return array<string, string> Normalized name => Original color name
     */
    private function getNormalizedColorIndex(): array
    {
        if ($this->normalizedColorIndex !== null) {
            return $this->normalizedColorIndex;
        }

        $this->normalizedColorIndex = [];
        foreach ($this->getAllowedColors() as $color) {
            $normalized = $this->normalize($color);
            if ($normalized === '' || isset($this->normalizedColorIndex[$normalized])) {
                continue;
            }

            $this->normalizedColorIndex[$normalized] = $color;
        }

        return $this->normalizedColorIndex;
    }

    /**
     * Check if a color is valid (exists in constant.goods.colors).
     *
     * @param string $color Color to check
     * @return bool True if color exists in allowed colors list
     */
    public function isValid(string $color): bool
    {
        $trimmed = trim($color);
        if ($trimmed === '') {
            return false;
        }

        $allowedColors = $this->getAllowedColors();
        return in_array($trimmed, $allowedColors, true);
    }

    /**
     * Get all constant colors from config/constant.php (goods.colors).
     *
     * @return array<string> List of allowed colors from constant config
     */
    public function getConstantColors(): array
    {
        return $this->getAllowedColors();
    }

    /**
     * Clear cached data.
     *
     * Call this if config('constant.goods.colors') changes at runtime
     * (useful for testing or dynamic configuration updates).
     *
     * @return void
     */
    public function clearCache(): void
    {
        $this->allowedColors = null;
        $this->normalizedColorIndex = null;
    }
}