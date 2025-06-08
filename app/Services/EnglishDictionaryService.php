<?php

namespace App\Services;

use App\Contracts\EnglishDictionaryServiceInterface;
use App\Models\EnglishWord;
use Illuminate\Database\Eloquent\Collection;

class EnglishDictionaryService implements EnglishDictionaryServiceInterface
{
    /**
     * Search for English words based on query string
     *
     * @param string|null $query
     * @param int $limit
     * @return Collection
     */
    public function search(?string $query, int $limit = 10): Collection
    {
        return EnglishWord::with(['wordData.examples'])
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
                        $query,           // Exact match: certificate
                        $query . '%',     // Starts with: certificate%
                        '%' . $query . '%', // Contains: %certificate%
                        '%' . $query      // Ends with: %certificate
                    ]);
            })
            ->limit($limit)
            ->get();
    }
}
