<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;

class SignInPage extends Page
{
    /**
     * Get the URL for the page.
     */
    public function url(): string
    {
        return '/signin';
    }

    /**
     * Assert that the browser is on the page.
     */
    public function assert(Browser $browser): void
    {
        $browser->assertPathIs($this->url());
    }

    /**
     * @inheritDoc
     */
    public static function siteElements(): array
    {
        return [
            '@email' => 'input[type=email]',
            '@password' => 'input[type=password]',
            '@remember' => 'button[role=checkbox]',
            '@submit' => 'button[type=submit]',

        ];
    }
}
