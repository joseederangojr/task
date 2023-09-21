<?php

use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

describe('SignInController', function () {
    it('should return auth token', function () {
        /** @var \Tests\TestCase $this */
        $user = User::factory()->create([
            'name' => 'Test',
            'email' => 'test@user.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/signin', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertOk();
        $response->assertJson(fn (AssertableJson $json) => $json->missing('data.user.password')->has('data.user')->has('data.authorization.token'));
    });

    it('should return validation error', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/signin', []);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['email', 'password']);
    });

    it('should return invalid credentials', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/signin', ['email' => 'not@user.com', 'password' => 'p4$$w0rD']);

        $response->assertBadRequest();
        $response->assertJsonPath('message', 'Invalid email or password');
    });

    it('should redirect if authenticated', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->postJson('/api/auth/signin', ['email' => 'not@user.com', 'password' => 'p4$$w0rD']);

        $response->assertRedirect('/');
    });
});
