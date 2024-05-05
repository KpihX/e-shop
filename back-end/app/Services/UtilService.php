<?php

namespace App\Services;

class UtilService
{
    // Intercalates arrays by taking one element from each until all are exhausted.
    public static function intercalateArrays(...$arrays) {
        $result = [];
        $continue = true;
        $index = 0;

        while ($continue) {
            $continue = false;

            foreach ($arrays as $array) {
                if (isset($array[$index])) {
                    $result[] = $array[$index];
                    $continue = true;
                } else {
                    $result[] = null;
                }
            }

            $index++;
        }

        return array_slice($result, 0, -4);
    }

    public static function getAtIndex(array $table, int $index) {
        return $table[$index % count($table)] ?? null;
    }
}
