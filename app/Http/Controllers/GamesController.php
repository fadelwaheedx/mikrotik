<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\JsonResponse;

class GamesController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Game::all());
    }
}
