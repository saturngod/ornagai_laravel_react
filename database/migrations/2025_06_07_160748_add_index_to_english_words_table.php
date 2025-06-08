<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('english_words', function (Blueprint $table) {
            $table->index('word', 'english_words_word_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('english_words', function (Blueprint $table) {
            $table->dropIndex('english_words_word_index');
        });
    }
};
