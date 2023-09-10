<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Model;

trait BaseTrait
{
    protected function bootIfNotBooted()
    {
        parent::bootIfNotBooted();

        if (! ($this instanceof Model)) {
            throw new \Exception('`BelongsToUser` should be used inside a model');
        }
    }
}
