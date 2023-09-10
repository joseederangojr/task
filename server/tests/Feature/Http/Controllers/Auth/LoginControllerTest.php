<?php

use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

describe('LoginController', function () {
    it('login should return auth token', function () {
        /** @var \Tests\TestCase $this */
        $user = User::factory()->create([
            'name' => 'Test',
            'email' => 'test@user.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertOk();
        $response->assertJson(fn (AssertableJson $json) => $json->missing('data.user.password')->has('data.user')->has('data.authorization.token'));
    });

    it('login should return validation error', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/login', []);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['email', 'password']);
    });

    it('login should return invalid credentials', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/login', ['email' => 'not@user.com', 'password' => 'p4$$w0rD']);

        $response->assertBadRequest();
        $response->assertJsonPath('message', 'Invalid email or password');
    });
});
