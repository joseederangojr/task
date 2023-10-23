<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        User::all()->each(function (User $user) {
            if (
                $user
                    ->spaces()
                    ->get()
                    ->count() === 0
            ) {
                $user->spaces()->create([
                    'name' => $user->name,
                    'type' => 'personal',
                    'updated_by_Id' => $user->id,
                ]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
