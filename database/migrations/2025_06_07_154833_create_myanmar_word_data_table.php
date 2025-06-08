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
        Schema::create('myanmar_word_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('myanmar_word_id')->nullable()->constrained('myanmar_words')->onDelete('cascade');
            $table->text('phonetics')->nullable();
            $table->text('state')->nullable();
            $table->text('meaning')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('myanmar_word_data');
    }
};
