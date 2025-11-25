<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    /** @var array<string, string> */
    protected $fillable = [
        'name',
        'slug',
        'ports_tcp',
        'ports_udp',
        'compatibility',
    ];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'ports_tcp' => 'array',
            'ports_udp' => 'array',
            'compatibility' => 'array',
        ];
    }
}
