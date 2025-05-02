<?php

namespace Database\Seeders;

use App\Models\Column;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = \App\Models\User::factory()->create([
            'email' => 'super@user.com',
            'password' => Hash::make('password'),
        ]);

        /** @var \App\Models\Space $space */
        $space = $user->spaces()->create([
            'name' => $user->name,
            'updated_by_id' => $user->id,
        ]);

        $space
            ->columns()
            ->createMany([
                [
                    'name' => 'To Do',
                    'status' => 'todo',
                    'order' => 1,
                ],
                [
                    'name' => 'Doing',
                    'status' => 'doing',
                    'order' => 2,
                ],
                [
                    'name' => 'Done',
                    'status' => 'done',
                    'order' => 3,
                ],
            ])
            ->each(function (Column $column) {
                $column->tasks()->createMany([]);
            });
    }
}
