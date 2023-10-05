<?php

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\HomePage;

afterEach(function () {
    $this->browse(function (Browser $browser) {
        $browser->logout();
    });
});

describe('HomeTest', function () {

    it('should be redirect to signin', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser
                ->visit(route('web.home', absolute: false))
                ->assertRouteIs('web.auth.signin');
        });
    });

    it('should load the page without problem', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $user = User::factory()->create();
            $browser
                ->loginAs($user->id)
                ->visit(new HomePage)
                ->assertSee('Dashboard')
                ->assertSee("Hi {$user->name}")
                ->assertSee('Spaces')
                ->assertSee('Settings')
                ->assertSee('Signout');
        });
    });

    it('should be able to signout', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $user = User::factory()->create();
            $browser
                ->loginAs($user->id)
                ->visit(new HomePage)
                ->press('Signout')
                ->pause(300)
                ->assertRouteIs('web.auth.signin');
        });
    });
});
