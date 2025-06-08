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
        Schema::create('english_word_data_examples', function (Blueprint $table) {
            $table->id();
            $table->foreignId('english_word_data_id')->nullable()->constrained('english_word_data')->onDelete('cascade');
            $table->text('example')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('english_word_data_examples');
    }
};
