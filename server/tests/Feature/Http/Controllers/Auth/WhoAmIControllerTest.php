<?php

use App\Models\User;

describe('WhoAmIController', function () {
    it('should return current authenticated user', function () {
        /** @var \Tests\TestCase $this */
        $user = User::factory()->create([
            'name' => 'test',
            'email' => 'test@user.com',
            'password' => 'password',
        ]);

        $token = $user->createToken($user->email)->plainTextToken;

        $response = $this->getJson('/api/auth/whoami', ['Authorization' => "Bearer $token"]);

        $response->assertOk();
        $response->assertJsonPath('data.email', $user->email);
    });

    it('should return unauthorized', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->getJson('/api/auth/whoami');

        $response->assertUnauthorized();
    });
});
