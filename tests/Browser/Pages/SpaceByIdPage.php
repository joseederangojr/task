<?php

namespace Tests\Browser\Pages;

use App\Models\User;
use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;

class SpaceByIdPage extends Page
{
    public function __construct(public User $user)
    {
        //
    }

    /**
     * Get the URL for the page.
     */
    public function url(): string
    {
        $space = $this->user->spaces()->first();

        return route(
            'web.space.show',
            [
                'space' => $space->id,
            ],
            absolute: false
        );
    }

    /**
     * Assert that the browser is on the page.
     */
    public function assert(Browser $browser): void
    {
        $browser->assertPathIs($this->url());
    }

    /**
     * {@inheritDoc}
     */
    public static function siteElements(): array
    {
        return [];
    }
}
