<?php

use App\Http\Controllers\LoadBalancing\PCCController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ToolController;
use App\Http\Middleware\EnsureUserIsPremium;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Free Tools
    Route::get('/qos/simple-queue', function() { return Inertia::render('QoS/SimpleQueue'); })->name('qos.simple-queue');
    Route::get('/hotspot/user-profile', function() { return Inertia::render('Hotspot/UserProfile'); })->name('hotspot.user-profile');

    // Premium Tools
    Route::middleware([EnsureUserIsPremium::class])->group(function () {
        Route::get('/load-balancing/pcc', [PCCController::class, 'index'])->name('load-balancing.pcc');
        Route::get('/load-balancing/ecmp', function() { return Inertia::render('LoadBalancing/ECMP'); })->name('load-balancing.ecmp');
        Route::get('/routing/game-ports', function() { return Inertia::render('Routing/GameRouting'); })->name('routing.game-ports');
        Route::get('/vpn/server', function() { return Inertia::render('VPN/VPNServer'); })->name('vpn.server');
    });

    // Save Tool Script
    Route::post('/tools/save', [ToolController::class, 'store'])->name('tools.save');

    // Subscription Placeholder
    Route::get('/subscription', function() { return Inertia::render('Subscription/Index'); })->name('subscription');
});

require __DIR__.'/auth.php';
