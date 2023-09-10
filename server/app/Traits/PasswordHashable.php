<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

trait PasswordHashable
{
    public static function bootPasswordHashable()
    {
        static::saving(function (User $user) {
            $user->password = Hash::make($user->password);
        });
    }
}
