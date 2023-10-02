<?php

use App\Models\User;

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
            'remember' => true,
        ]);

        $response->assertRedirectToRoute('web.home');
    });

    it('should return validation error', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/signin', []);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['email', 'password', 'remember']);
    });

    it('should return invalid credentials', function () {
        /** @var \Tests\TestCase $this */
        $response = $this
            ->postJson('/api/auth/signin', [
                'email' => 'not@user.com',
                'password' => 'p4$$w0rD',
                'remember' => true
            ]);

        $response->assertBadRequest();
        $response->assertJsonPath('message', 'Invalid email or password');
    });

    it('should redirect if authenticated', function () {
        /** @var \Tests\TestCase $this */
        $response = $this
            ->actingAs(User::factory()->create())
            ->postJson('/api/auth/signin', [
                'email' => 'not@user.com',
                'password' => 'p4$$w0rD',
                'remember' => true
            ]);

        $response->assertRedirectToRoute('web.home');
    });
});
