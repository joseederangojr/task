<?php

use Laravel\Dusk\Browser;
use Tests\Browser\Pages\SpaceByIdPage;

beforeEach(function () {
    /** @var Tests\DuskTestCase $this */
    $this->browse(function (Browser $browse) {
        $browse->logout();
        $browse->login()->visit(new SpaceByIdPage($this->user));
    });
});

afterEach(function () {
    /** @var Tests\DuskTestCase $this */
    $this->browse(function (Browser $browse) {
        $browse->logout();
    });
});

describe('SpaceByIdTest', function () {
    it('should show welcome message', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browse) {
            $space = $this->user->spaces()->first();
            $browse
                ->waitForRoute('web.space.show', ['space' => $space->id])
                ->assertRouteIs('web.space.show', ['space' => $space->id])
                ->assertSee("Welcome to your {$space->name} space.")
                ->assertPresent('@nav-home')
                ->assertAttribute(
                    '@nav-home',
                    'href',
                    route('web.space.index', absolute: false)
                );
        });
    });

    it('should be able to logout', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browse) {
            $browse
                ->assertPresent('@user-nav-trigger')
                ->click('@user-nav-trigger')
                ->waitForText($this->user->name)
                ->waitFor('@user-nav-item-logout')
                ->assertAttribute(
                    '@user-nav-item-logout',
                    'href',
                    route('api.auth.signout', absolute: false)
                )
                ->click('@user-nav-item-logout')
                ->waitForRoute('web.auth.signin')
                ->assertRouteIs('web.auth.signin');
        });
    });

    it('should be able to select space', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browse) {
            $personal = $this->user->spaces()->first();
            $team = $this->user->spaces()->create([
                'name' => 'Team Space',
                'updated_by_id' => $this->user->id,
                'created_by_id' => $this->user->id,
                'type' => 'team',
            ]);
            $browse
                ->refresh()
                ->assertPresent('@space-select-trigger')
                ->click('@space-select-trigger')
                ->waitFor('@space-select-items')
                ->assertPresent("@space-select-item-{$personal->id}")
                ->assertPresent("@space-select-item-{$team->id}")
                ->assertPresent('@space-select-new')
                ->click("@space-select-item-{$team->id}")
                ->waitForRoute('web.space.show', ['space' => $team->id])
                ->assertRouteIs('web.space.show', ['space' => $team->id]);
        });
    });

    it('should be able to create new space', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browse) {
            $browse
                ->waitFor('@space-select-trigger')
                ->click('@space-select-trigger')
                ->waitFor('@space-select-items')
                ->assertPresent('@space-select-new')
                ->click('@space-select-new')
                ->waitFor('@create-space-dialog')
                ->assertPresent('@create-space-dialog-name')
                ->assertPresent('@create-space-dialog-create')
                ->type('@create-space-dialog-name', 'New Team Space')
                ->click('@create-space-dialog-create')
                ->waitUntilMissing('@create-space-dialog')
                ->assertSee('New Team Space');
        });
    });
});
