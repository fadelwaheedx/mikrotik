<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedScript extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'type',
        'config_json',
        'generated_script',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
