<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Contracts\EnglishDictionaryServiceInterface;
use App\Contracts\MyanmarDictionaryServiceInterface;

class HomeController extends Controller
{
    protected EnglishDictionaryServiceInterface $englishDictionaryService;
    protected MyanmarDictionaryServiceInterface $myanmarDictionaryService;

    public function __construct(
        EnglishDictionaryServiceInterface $englishDictionaryService,
        MyanmarDictionaryServiceInterface $myanmarDictionaryService
    ) {
        $this->englishDictionaryService = $englishDictionaryService;
        $this->myanmarDictionaryService = $myanmarDictionaryService;
    }

    function index()
    {
        return Inertia::render('home');
    }

    function search(Request $request)
    {
        $query = $request->input('q');
        
        $enWords = [];
        $myWords = [];
        
        //check query in unicode 0x1000–0x109F
        if ($query && preg_match('/[\x{1000}-\x{109F}]/u', $query)) {
            // If the query contains Burmese characters, search Myanmar words using service
            $myWords = $this->myanmarDictionaryService->search($query, 10);
        } else {
            // Use the service to search for English words
            $enWords = $this->englishDictionaryService->search($query, 10);
        }
        
        return Inertia::render('search', [
            'query' => $query,
            'words' => $enWords,
            'myWords' => $myWords,
        ]);
    }
}
