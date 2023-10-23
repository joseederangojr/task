<?php

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\HomePage;

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
                ->waitForRoute('web.auth.signin')
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
                ->assertSee('Signout')
                ->assertButtonEnabled('@space-select-trigger');
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
                ->click('@sidebar-item-Signout')
                ->waitForRoute('web.auth.signin');
        });
    });

    it('should have space combobox selector', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $user = User::factory()->create();
            $select = $user
                ->spaces()
                ->create(['name' => $user->name, 'updated_by_id' => $user->id]);
            $browser
                ->loginAs($user->id)
                ->visit(new HomePage())
                ->assertSee($user->name)
                ->assertButtonEnabled('@space-select-trigger')
                ->click('@space-select-trigger')
                ->waitForText('New Space')
                ->assertSee('Personal')
                ->assertSee('Team')
                ->click("@space-select-{$select->id}")
                ->assertDontSee('New Space')
                ->click('@space-select-trigger')
                ->waitForText('New Space')
                ->click('@space-select-new')
                ->waitForText('Create Space')
                ->assertSee('Create Space')
                ->assertSeeIn('@create-space-dialog-create', 'Create')
                ->assertInputValue('@create-space-dialog-name', '')
                ->type('@create-space-dialog-name', 'My team space')
                ->click('@create-space-dialog-create')
                ->assertButtonDisabled('@create-space-dialog-create')
                ->waitForText('My team space')
                ->assertSee('My team space')
                ->click('@space-select-new')
                ->waitForText('Create Space')
                ->type('@create-space-dialog-name', 'My team space')
                ->click('@create-space-dialog-create')
                ->waitForText('Space already exist')
                ->assertSee('Space already exist')
                ->assertPresent('@dialog-close')
                ->click('@dialog-close')
                ->waitUntilMissing('@create-space-dialog-create')
                ->assertNotPresent('@create-space-dialog-create');
        });
    });
});
