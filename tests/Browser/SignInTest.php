<?php

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\SignInPage;

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

describe('SignInTest', function () {
    it('should load the page without problem', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser
                ->visit(new SignInPage())
                ->assertSee('Task')
                ->assertSee('Manage your tasks from multiple spaces in one place')
                ->assertInputValue('@email', '')
                ->assertInputValue('@password', '')
                ->assertAriaAttribute('@remember', 'checked', 'true')
                ->assertSee('Sign in');
        });
    });

    it('should sign in successfully', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $user = User::factory()->create([]);
            $browser
                ->visit(new SignInPage())
                ->waitFor('@email')
                ->type('@email', $user->email)
                ->type('@password', 'password')
                ->click('@submit')
                ->assertButtonDisabled('@submit')
                ->waitForRoute('web.home');
            $browser->logout();
        });
    });

    it('should show validation error message', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser
                ->visit(new SignInPage())
                ->click('@submit')
                ->waitForText('The email field is required')
                ->assertSee('The password field is required')
                ->type('@email', 'invalid@email.com')
                ->type('@password', 'password')
                ->click('@submit')
                ->waitForText('Invalid email or password');
        });
    });

    it('should navigate to signup', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser
                ->visit(new SignInPage())
                ->waitForText('Sign up')
                ->click('@signup')
                ->waitForRoute('web.auth.signup');
        });
    });
});
