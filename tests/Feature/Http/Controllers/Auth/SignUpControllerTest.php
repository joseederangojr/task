<?php

use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

describe('SignUpController', function () {
    it('should return created http response with auth token', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/signup', [
            'name' => 'Test',
            'email' => 'test@user.com',
            'password' => 'password',
            'passwordConfirmation' => 'password',
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
            'passwordConfirmation' => 'password',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors('email');
    });

    it('should return validation exception', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->postJson('/api/auth/signup', []);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['name', 'email', 'password', 'passwordConfirmation']);
    });

    it('should redirect if authenticated', function () {
        /** @var \Tests\TestCase $this */
        $response = $this
            ->actingAs(User::factory()->create())
            ->postJson('/api/auth/signup', [
                'name' => 'fake',
                'email' => 'not@user.com',
                'password' => 'p4$$w0rD',
                'passwordConfirmation' => 'p4$$w0rD',
            ]);

        $response->assertRedirectToRoute('web.home');
    });
});
