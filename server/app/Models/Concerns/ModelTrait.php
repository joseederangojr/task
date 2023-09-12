<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Model;

trait ModelTrait
{
    protected function bootIfNotBooted()
    {
        parent::bootIfNotBooted();

        if (! ($this instanceof Model)) {
            throw new \Exception('`ModelTrait` should be used inside a model');
        }
    }
}
