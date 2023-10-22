<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = \App\Models\User::factory()->create([
            'email' => 'super@user.com',
            'password' => 'password',
        ]);

        $user->spaces()->create([
            'name' => $user->name,
            'updated_by_id' => $user->id,
        ]);
    }
}
