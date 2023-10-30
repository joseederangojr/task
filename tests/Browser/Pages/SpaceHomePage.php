<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;

class SpaceHomePage extends Page
{
    /**
     * Get the URL for the page.
     */
    public function url(): string
    {
        return route('web.space.index', absolute: false);
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
