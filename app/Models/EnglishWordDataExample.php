<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnglishWordDataExample extends Model
{
    protected $fillable = [
        'english_word_data_id',
        'example'
    ];

    /**
     * Get the word data that this example belongs to.
     */
    public function englishWordData()
    {
        return $this->belongsTo(EnglishWordData::class);
    }
}
