<?php

namespace App\Models\Concerns;

use App\Models\User;

trait BelongsToUser
{
    use BaseTrait;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
