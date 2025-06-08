<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface MyanmarDictionaryServiceInterface
{
    /**
     * Search for Myanmar words based on query string
     *
     * @param string|null $query
     * @param int $limit
     * @return Collection
     */
    public function search(?string $query, int $limit = 10): Collection;
}
