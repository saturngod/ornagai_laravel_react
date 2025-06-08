<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnglishWord extends Model
{
    protected $fillable = [
        'word'
    ];

    /**
     * Get the word data for this English word.
     */
    public function wordData()
    {
        return $this->hasMany(EnglishWordData::class);
    }
}
