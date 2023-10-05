<?php

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\SignInPage;

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
            $browser->visit(new SignInPage)
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
            $browser->visit(new SignInPage)
                ->type('@email', $user->email)
                ->type('@password', 'password')
                ->pause(300)
                ->click('@submit')
                ->assertButtonDisabled('@submit')
                ->pause(300)
                ->assertPathIs('/');
        });
    });

    it('should show validation error message', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser->visit(new SignInPage)
                ->click('@submit')
                ->pause(300)
                ->assertSee('The email field is required')
                ->assertSee('The password field is required')
                ->type('@email', 'invalid@email.com')
                ->type('@password', 'password')
                ->click('@submit')
                ->pause(300)
                ->assertSee('Invalid email or password');
        });
    });

    it('should navigate to signup', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser->visit(new SignInPage)
                ->assertSee('Sign up')
                ->click('@signup')
                ->pause(300)
                ->assertPathIs('/signup');
        });
    });
});
