<?php

use App\Models\User;

describe('WhoAmIController', function () {
    it('should return current authenticated user', function () {
        /** @var \Tests\TestCase $this */
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->getJson('/api/auth/whoami');

        $response->assertOk();
        $response->assertJsonPath('data.email', $user->email);
    });

    it('should return unauthorized', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->getJson('/api/auth/whoami');

        $response->assertUnauthorized();
    });
});
