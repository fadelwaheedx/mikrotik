<?php

declare(strict_types=1);

namespace App\Http\Controllers\LoadBalancing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PCCController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('LoadBalancing/PCC', [
            'pageTitle' => 'PCC Load Balancing Generator',
            'description' => 'Generate Per Connection Classifier (PCC) mangle rules for multi-WAN setups.',
        ]);
    }
}
