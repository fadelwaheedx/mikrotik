<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Snippet extends Model
{
    use HasFactory;

    /** @var array<string, string> */
    protected $fillable = [
        'title',
        'description',
        'category',
        'code',
        'source_url',
    ];
}
