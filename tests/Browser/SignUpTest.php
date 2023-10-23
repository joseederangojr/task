<?php

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\SignUpPage;

beforeEach(function () {
    /** @var Tests\DuskTestCase $this */
    $this->browse(function (Browser $browse) {
        $browse->logout();
    });
});

afterEach(function () {
    /** @var Tests\DuskTestCase $this */
    $this->browse(function (Browser $browse) {
        $browse->logout();
    });
});

describe('SignUpTest', function () {
    it('should load the page without problem', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser
                ->visit(new SignUpPage())
                ->assertSee('Task')
                ->assertSee('Manage your tasks from multiple spaces in one place')
                ->assertInputValue('@name', '')
                ->assertInputValue('@email', '')
                ->assertInputValue('@password', '')
                ->assertInputValue('@password_confirmation', '')
                ->assertSee('Sign up');
        });
    });

    it('should sign up successfully', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser
                ->visit(new SignUpPage())
                ->type('@name', 'Name')
                ->type('@email', 'user@test.com')
                ->type('@password', 'password')
                ->type('@password_confirmation', 'password')
                ->click('@submit')
                ->assertButtonDisabled('@submit')
                ->waitForRoute('web.home');
        });
    });

    it('should show validation error message', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $user = User::factory()->create([
                'name' => 'User',
                'email' => 'user@email.com',
                'password' => 'password',
            ]);

            $browser
                ->visit(new SignUpPage())
                ->click('@submit')
                ->waitForText('The name field is required.')
                ->assertSee('The email field is required.')
                ->assertSee('The password field is required.')
                ->assertSee('The password confirmation field is required.')
                ->click('@submit')
                ->waitFor('@name')
                ->type('@name', 'Name')
                ->type('@email', $user->email)
                ->type('@password', 'asdfasdasdasd')
                ->type('@password_confirmation', 'asdsadasd')
                ->click('@submit')
                ->waitForText('The password field confirmation does not match.')
                ->clear('@password')
                ->clear('@password_confirmation')
                ->type('@password', 'password')
                ->type('@password_confirmation', 'password')
                ->click('@submit')
                ->waitForText('The email has already been taken');
        });
    });

    it('should navigate to signin', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser
                ->visit(new SignUpPage())
                ->assertSee('Sign In')
                ->click('@signin')
                ->waitForRoute('web.auth.signin');
        });
    });
});
