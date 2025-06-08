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
        Schema::create('english_word_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('english_word_id')->nullable()->constrained('english_words')->onDelete('cascade');
            $table->text('state')->nullable();
            $table->text('def')->nullable();
            $table->text('ipa')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('english_word_data');
    }
};
