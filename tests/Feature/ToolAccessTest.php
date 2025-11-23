<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ToolAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_redirected_to_login(): void
    {
        $response = $this->get(route('load-balancing.pcc'));
        $response->assertRedirect(route('login'));
    }

    public function test_free_user_redirected_to_subscription(): void
    {
        $user = User::factory()->create(['is_premium' => false]);
        $response = $this->actingAs($user)->get(route('load-balancing.pcc'));

        $response->assertRedirect(route('subscription'));
        $response->assertSessionHas('error'); // Check flash message
    }

    public function test_premium_user_can_access_pcc(): void
    {
        $user = User::factory()->create(['is_premium' => true]);
        $response = $this->actingAs($user)->get(route('load-balancing.pcc'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('LoadBalancing/PCC')
        );
    }
}
