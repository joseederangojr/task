<?php

use App\Models\User;

describe('SignUpController', function () {
    it('should return created http response with auth token', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/signup', [
            'name' => 'Test',
            'email' => 'test@user.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertRedirectToRoute('web.home');
    });

    it('should return validation exception for unique email', function () {
        /** @var \Tests\TestCase $this */
        User::factory()->create([
            'name' => 'Test',
            'email' => 'test@user.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/signup', [
            'name' => 'Test',
            'email' => 'test@user.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors('email');
    });

    it('should return validation exception', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/signup', []);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'name',
            'email',
            'password',
            'password_confirmation',
        ]);
    });

    it('should redirect if authenticated', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->actingAs(User::factory()->create())->postJson(
            '/api/auth/signup',
            [
                'name' => 'fake',
                'email' => 'not@user.com',
                'password' => 'p4$$w0rD',
                'password_confirmation' => 'p4$$w0rD',
            ]
        );

        $response->assertRedirectToRoute('web.home');
    });
});
