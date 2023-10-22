<?php

use App\Models\User;

describe('SignOutController', function () {
    it('should signout user', function () {
        /** @var \Tests\TestCase $this */
        $response = $this->actingAs(User::factory()->create())->postJson(
            '/api/auth/signout'
        );

        $response->assertRedirectToRoute('web.auth.signin');
    });
});
