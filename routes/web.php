<?php

use App\Http\Controllers\LoadBalancing\PCCController;
use App\Http\Controllers\ProfileController;
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

    // Load Balancing Routes
    Route::get('/load-balancing/pcc', [PCCController::class, 'index'])->name('load-balancing.pcc');

    // Placeholders for other routes mentioned in plan
    Route::get('/load-balancing/ecmp', function() { return Inertia::render('LoadBalancing/ECMP'); })->name('load-balancing.ecmp');
    Route::get('/qos/simple-queue', function() { return Inertia::render('QoS/SimpleQueue'); })->name('qos.simple-queue');
    Route::get('/routing/game-ports', function() { return Inertia::render('Routing/GameRouting'); })->name('routing.game-ports');
});

require __DIR__.'/auth.php';
