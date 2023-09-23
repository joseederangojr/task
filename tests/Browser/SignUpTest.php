<?php

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\SignUpPage;

describe('SignUpTest', function () {
    it('should load the page without problem', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser->visit(new SignUpPage)
                ->assertSee('Task')
                ->assertSee('Manage your tasks from multiple spaces in one place')
                ->assertInputValue('@name', '')
                ->assertInputValue('@email', '')
                ->assertInputValue('@password', '')
                ->assertInputValue('@passwordConfirmation', '')
                ->assertSee('Sign up');
        });
    });

    it('should sign up successfully', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser->visit(new SignUpPage)
                ->type('@name', 'Name')
                ->type('@email', 'user@test.com')
                ->type('@password', 'password')
                ->type('@passwordConfirmation', 'password')
                ->click('@submit')
                ->assertButtonDisabled('@submit')
                ->pause(300)
                ->assertPathIs('/');

            $browser->deleteCookie('laravel_session');
        });
    });

    it('should show validation error message', function () {
        /** @var Tests\DuskTestCase $this */
        User::factory()->create([
            'name' => 'User',
            'email' => 'user@email.com',
            'password' => 'password',
        ]);
        $this->browse(function (Browser $browser) {
            $browser->visit(new SignUpPage)
                ->click('@submit')
                ->assertSee('String must contain at least 1 character(s)')
                ->assertSee('Invalid email')
                ->click('@submit')
                ->type('@name', 'Name')
                ->type('@email', 'user@email.com')
                ->type('@password', 'asdf')
                ->type('@passwordConfirmation', 'asdsadasd')
                ->assertSee('String must contain at least 8 character(s)')
                ->assertSee('Passwords do not match')
                ->clear('@password')
                ->clear('@passwordConfirmation')
                ->type('@password', 'password')
                ->type('@passwordConfirmation', 'password')
                ->click('@submit')
                ->pause(300)
                ->assertSee('The email has already been taken');
        });
    });

    it('should navigate to signin', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser->visit(new SignUpPage)
                ->assertSee('Sign In')
                ->click('@signin')
                ->pause(100)
                ->assertPathIs('/signin');
        });
    });
});
