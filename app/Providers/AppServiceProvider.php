<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\EnglishDictionaryServiceInterface;
use App\Services\EnglishDictionaryService;
use App\Contracts\MyanmarDictionaryServiceInterface;
use App\Services\MyanmarDictionaryService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(EnglishDictionaryServiceInterface::class, EnglishDictionaryService::class);
        $this->app->bind(MyanmarDictionaryServiceInterface::class, MyanmarDictionaryService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
