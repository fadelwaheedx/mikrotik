<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    use HasFactory;

    /** @var array<string, string> */
    protected $fillable = [
        'name',
        'slug',
        'form_schema',
        'script_template',
    ];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'form_schema' => 'array',
        ];
    }
}
