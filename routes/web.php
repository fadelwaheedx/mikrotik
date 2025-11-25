<?php

use App\Http\Controllers\GamesController;
use App\Http\Controllers\LoadBalancing\PCCController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ToolsController;
use App\Http\Middleware\EnsureUserIsPremium;
use App\Models\SavedScript;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'savedScripts' => SavedScript::where('user_id', auth()->id())->latest()->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Free Tools
    Route::get('/qos/simple-queue', function() { return Inertia::render('QoS/SimpleQueue'); })->name('qos.simple-queue');
    Route::get('/hotspot/user-profile', function() { return Inertia::render('Hotspot/UserProfile'); })->name('hotspot.user-profile');
    Route::get('/routing/content-routing', function() { return Inertia::render('Routing/ContentRouting'); })->name('routing.content-routing');

    // Premium Tools
    Route::middleware([EnsureUserIsPremium::class])->group(function () {
        Route::get('/load-balancing/pcc', [PCCController::class, 'index'])->name('load-balancing.pcc');
        Route::get('/load-balancing/ecmp', function() { return Inertia::render('LoadBalancing/ECMP'); })->name('load-balancing.ecmp');
        Route::get('/vpn/server', function() { return Inertia::render('VPN/VPNServer'); })->name('vpn.server');

        // Game Routing (Uses Dynamic Data)
        Route::get('/routing/game-ports', function() { return Inertia::render('Routing/GameRouting'); })->name('routing.game-ports');
    });

    // Save Tool Script
    Route::post('/tools/save', [ToolsController::class, 'store'])->name('tools.save');
    Route::delete('/tools/{id}', [ToolsController::class, 'destroy'])->name('tools.destroy');

    // API Routes (Consumed by Frontend)
    Route::get('/api/games', [GamesController::class, 'index'])->name('api.games');

    // Subscription
    Route::get('/subscription', function() { return Inertia::render('Subscription'); })->name('subscription');
});

require __DIR__.'/auth.php';
