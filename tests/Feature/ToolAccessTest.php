<?php

use App\Models\User;

test('guest is redirected to login', function () {
    $response = $this->get(route('load-balancing.pcc'));
    $response->assertRedirect(route('login'));
});

test('free user is redirected to subscription', function () {
    $user = User::factory()->create(['is_premium' => false]);

    $response = $this->actingAs($user)->get(route('load-balancing.pcc'));

    $response->assertRedirect(route('subscription'));
    $response->assertSessionHas('error');
});

test('premium user can access pcc', function () {
    $user = User::factory()->create(['is_premium' => true]);

    $response = $this->actingAs($user)->get(route('load-balancing.pcc'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('LoadBalancing/PCC')
    );
});
