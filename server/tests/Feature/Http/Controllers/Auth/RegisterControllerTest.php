<?php

use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

describe('RegisterController', function () {
    it('should return created http response with auth token and user data', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test',
            'email' => 'test@user.com',
            'password' => 'password',
        ]);

        $response->assertCreated();
        $response->assertJson(fn (AssertableJson $json) => $json->missing('data.user.password')->has('data.user')->has('data.authorization.token'));
    });

    it('should return validation exception for unique email', function () {
        /** @var \Tests\TestCase $this */
        User::factory()->create([
            'name' => 'Test',
            'email' => 'test@user.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test',
            'email' => 'test@user.com',
            'password' => 'password',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors('email');
    });

    it('should return validation exception', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/register', []);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['name', 'email', 'password']);
    });

    it('should redirect if authenticated', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->postJson('/api/auth/register', ['name' => 'fake', 'email' => 'not@user.com', 'password' => 'p4$$w0rD']);

        $response->assertRedirect('/');
    });
});
