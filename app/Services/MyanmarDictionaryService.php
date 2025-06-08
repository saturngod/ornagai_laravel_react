<?php

namespace App\Services;

use App\Contracts\MyanmarDictionaryServiceInterface;
use App\Models\MyanmarWord;
use Illuminate\Database\Eloquent\Collection;

class MyanmarDictionaryService implements MyanmarDictionaryServiceInterface
{
    /**
     * Search for Myanmar words based on query string
     *
     * @param string|null $query
     * @param int $limit
     * @return Collection
     */
    public function search(?string $query, int $limit = 10): Collection
    {
        return MyanmarWord::with(['myanmarWordData'])
            ->when($query, function ($queryBuilder) use ($query) {
                return $queryBuilder->where('word', 'like', '%' . $query . '%')
                    ->orderByRaw("
                        CASE 
                            WHEN word = ? THEN 1
                            WHEN word LIKE ? THEN 2
                            WHEN word LIKE ? THEN 3
                            WHEN word LIKE ? THEN 4
                            ELSE 5
                        END, word ASC
                    ", [
                        $query,           // Exact match
                        $query . '%',     // Starts with
                        '%' . $query . '%', // Contains
                        '%' . $query      // Ends with
                    ]);
            })
            ->limit($limit)
            ->get();
    }
}
