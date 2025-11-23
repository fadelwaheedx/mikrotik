<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageRenderTest extends TestCase
{
    use RefreshDatabase;

    public function test_simple_queue_page_renders(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('qos.simple-queue'));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('QoS/SimpleQueue'));
    }

    public function test_hotspot_profile_page_renders(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('hotspot.user-profile'));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Hotspot/UserProfile'));
    }

    public function test_game_routing_page_renders(): void
    {
        $user = User::factory()->create(['is_premium' => true]);
        $response = $this->actingAs($user)->get(route('routing.game-ports'));
        $response->assertStatus(200);
    }

    public function test_subscription_page_renders(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('subscription'));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Subscription'));
    }
}
