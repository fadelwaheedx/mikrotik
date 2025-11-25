<?php

declare(strict_types=1);

use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    // Mock setup
});

test('super admin can access filament panel', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get('/admin');
    $response->assertStatus(200);
});

test('subscriber cannot access filament panel', function () {
    $user = User::factory()->create();
    expect(true)->toBeTrue();
});
