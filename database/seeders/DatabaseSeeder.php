<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Premium User (Admin)
        User::factory()->create([
            'name' => 'Premium Admin',
            'email' => 'admin@project-x.com',
            'password' => Hash::make('password'),
            'is_premium' => true,
        ]);

        // 2. Standard User (Free Tier)
        User::factory()->create([
            'name' => 'Standard User',
            'email' => 'user@project-x.com',
            'password' => Hash::make('password'),
            'is_premium' => false,
        ]);
    }
}
