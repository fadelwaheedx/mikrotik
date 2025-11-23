<?php

namespace Tests\Feature;

use App\Models\SavedScript;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_loads_with_scripts(): void
    {
        $user = User::factory()->create();
        SavedScript::factory()->count(3)->create(['user_id' => $user->id]);

        // Create a script for another user to ensure it doesn't show up
        SavedScript::factory()->create(['user_id' => User::factory()->create()->id]);

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->has('savedScripts', 3)
        );
    }

    public function test_dashboard_redirects_guest(): void
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }
}
