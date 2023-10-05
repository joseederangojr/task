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
                ->assertInputValue('@password_confirmation', '')
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
                ->type('@password_confirmation', 'password')
                ->click('@submit')
                ->assertButtonDisabled('@submit')
                ->pause(300)
                ->assertPathIs('/');

            $browser->deleteCookie('laravel_session');
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

            $browser->visit(new SignUpPage)
                ->click('@submit')
                ->pause(300)
                ->assertSee('The name field is required.')
                ->assertSee('The email field is required.')
                ->assertSee('The password field is required.')
                ->assertSee('The password confirmation field is required.')
                ->click('@submit')
                ->pause(300)
                ->type('@name', 'Name')
                ->type('@email', $user->email)
                ->type('@password', 'asdfasdasdasd')
                ->type('@password_confirmation', 'asdsadasd')
                ->click('@submit')
                ->pause(300)
                ->assertSee('The password field confirmation does not match.')
                ->clear('@password')
                ->clear('@password_confirmation')
                ->type('@password', 'password')
                ->type('@password_confirmation', 'password')
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
