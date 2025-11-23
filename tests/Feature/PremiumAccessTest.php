<?php

use App\Models\User;

test('non-premium user cannot access pcc tool', function () {
    $user = User::factory()->create(['is_premium' => false]);

    $response = $this->actingAs($user)->get(route('load-balancing.pcc'));

    $response->assertRedirect(route('subscription'));
});

test('premium user can access pcc tool', function () {
    $user = User::factory()->create(['is_premium' => true]);

    $response = $this->actingAs($user)->get(route('load-balancing.pcc'));

    $response->assertStatus(200);
});

test('guest is redirected to login', function () {
    $response = $this->get(route('load-balancing.pcc'));

    $response->assertRedirect(route('login'));
});
