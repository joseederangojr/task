<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

describe('SignOutController', function () {
    it('should signout user', function () {
        /** @var \Tests\TestCase $this */
        $user = User::factory()->create();

        Sanctum::actingAs(
            $user,
            []
        );

        $response = $this->actingAs($user)->postJson('/api/auth/signout', [],  [
            'referer' => env('SANCTUM_STATEFUL_DOMAINS'),
        ]);

        $response->assertNoContent();
    });
});
