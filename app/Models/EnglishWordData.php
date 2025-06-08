<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnglishWordData extends Model
{
    protected $fillable = [
        'english_word_id',
        'ipa',
        'state',
        'def'
    ];

    /**
     * Get the English word that this data belongs to.
     */
    public function englishWord()
    {
        return $this->belongsTo(EnglishWord::class);
    }

    /**
     * Get the examples for this word data.
     */
    public function examples()
    {
        return $this->hasMany(EnglishWordDataExample::class);
    }
}
