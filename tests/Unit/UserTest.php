<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_is_premium_casts_to_boolean(): void
    {
        $user = new User(['is_premium' => 1]);
        $this->assertTrue($user->is_premium);
        $this->assertIsBool($user->is_premium);

        $user = new User(['is_premium' => 0]);
        $this->assertFalse($user->is_premium);
        $this->assertIsBool($user->is_premium);
    }

    public function test_is_premium_defaults_to_false_in_factory(): void
    {
        // Requires RefreshDatabase if saving, but for unit we check instance
        $user = User::factory()->make();
        $this->assertFalse($user->is_premium);
    }
}
