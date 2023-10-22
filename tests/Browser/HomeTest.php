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
    beforeEach(function () {
        $user = User::factory()->create();
        $user->spaces()->create(['name' => $user->name, 'updated_by_id' => $user->id]);
    });
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
            $user
                ->spaces()
                ->create(['name' => $user->name, 'updated_by_id' => $user->id]);
            $browser
                ->loginAs($user->id)
                ->visit(new HomePage())
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
            $user
                ->spaces()
                ->create(['name' => $user->name, 'updated_by_id' => $user->id]);
            $browser
                ->loginAs($user->id)
                ->visit(new HomePage())
                ->press('Signout')
                ->pause(300)
                ->assertRouteIs('web.auth.signin');
        });
    });

    it('should have space combobox selector', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $user = User::factory()->create();
            $user
                ->spaces()
                ->create(['name' => $user->name, 'updated_by_id' => $user->id]);
            $browser
                ->loginAs($user->id)
                ->visit(new HomePage())
                ->assertSee($user->name)
                ->assertButtonEnabled('@space-select-trigger')
                ->click('@space-select-trigger')
                ->pause(100)
                ->assertSee('New Space')
                ->click('@space-select-new')
                ->pause(100)
                ->assertSee('Create Space')
                ->assertSeeIn('@create-space-dialog-create', 'Create')
                ->assertInputValue('@create-space-dialog-name', '')
                ->type('@create-space-dialog-name', 'My team space')
                ->click('@create-space-dialog-create')
                ->assertSee('Creating ...')
                ->assertButtonDisabled('@create-space-dialog-create')
                ->pause(100)
                ->assertSee('My team space')
                ->click('@space-select-new')
                ->assertInputValue('@create-space-dialog-name', '')
                ->type('@create-space-dialog-name', 'My team space')
                ->click('@create-space-dialog-create')
                ->pause(100)
                ->assertSee('Space already exist')
                ->assertPresent('@dialog-close')
                ->press('@dialog-close')
                ->pause(300)
                ->assertNotPresent('@create-space-dialog-create');
        });
    });
});
