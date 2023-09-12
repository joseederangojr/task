<?php

namespace App\Models\Concerns;

use App\Models\User;

trait BelongsToUser
{
    use ModelTrait;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
