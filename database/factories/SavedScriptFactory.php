<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SavedScript>
 */
class SavedScriptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(3),
            'type' => fake()->randomElement(['pcc', 'qos', 'vpn', 'hotspot']),
            'config_json' => json_encode(['target' => '192.168.1.1', 'limit' => '10M']),
            'generated_script' => '/ip firewall mangle add...',
        ];
    }
}
