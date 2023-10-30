<?php

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\SpaceHomePage;

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

describe('SpaceHomeTest', function () {
    beforeEach(function () {
        $user = User::factory()->create();
        $user->spaces()->create(['name' => $user->name, 'updated_by_id' => $user->id]);
    });
    it('should be redirect to signin', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $browser
                ->visit(route('web.space.index', absolute: false))
                ->waitForRoute('web.auth.signin')
                ->assertRouteIs('web.auth.signin');
        });
    });

    it('should load the page without problem', function () {
        /** @var Tests\DuskTestCase $this */
        $this->browse(function (Browser $browser) {
            $user = $this->user;
            $space = $user->spaces()->first();
            $browser
                ->login()
                ->visit(new SpaceHomePage())
                ->waitForRoute('web.space.index')
                ->assertSee('Select Space')
                ->assertSeeIn("@space-{$space->id}", $space->name)
                ->assertAttribute("@space-{$space->id}", 'href', "/space/{$space->id}")
                ->click("@space-{$space->id}")
                ->waitForRoute('web.space.show', ['space' => $space->id])
                ->assertRouteIs('web.space.show', ['space' => $space->id]);
        });
    });
});
