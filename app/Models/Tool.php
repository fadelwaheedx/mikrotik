<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'form_schema',
        'script_template',
    ];

    protected $casts = [
        'form_schema' => 'array',
    ];
}
