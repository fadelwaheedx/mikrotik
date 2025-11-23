<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'ports_tcp',
        'ports_udp',
        'compatibility',
    ];

    protected $casts = [
        'ports_tcp' => 'array',
        'ports_udp' => 'array',
        'compatibility' => 'array',
    ];
}
