<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\MyanmarWordData;

class MyanmarWord extends Model
{

    public function myanmarWordData()
    {
        return $this->hasMany(MyanmarWordData::class);
    }
}
