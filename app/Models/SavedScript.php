<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavedScript extends Model
{
    use HasFactory;

    /** @var array<string, string> */
    protected $fillable = [
        'user_id',
        'title',
        'type',
        'config_json',
        'generated_script',
    ];

    /** @return BelongsTo<User, SavedScript> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
