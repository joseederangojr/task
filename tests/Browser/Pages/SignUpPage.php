<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;

class SignUpPage extends Page
{
    /**
     * Get the URL for the page.
     */
    public function url(): string
    {
        return route('web.auth.signup', absolute: false);
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
        return [
            '@name' => 'input[name="name"]',
            '@email' => 'input[name="email"]',
            '@password' => 'input[name="password"]',
            '@password_confirmation' => 'input[name="password_confirmation"]',
            '@submit' => 'button[type=submit]',
            '@signin' => 'a[href="/signin"]',
        ];
    }
}
