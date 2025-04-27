<?php

namespace App\Models\Concerns;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

trait HashPassword
{
    public static function bootHashPassword()
    {
        static::saving(function (User $model) {
            if (! Hash::isHashed($model->password)) {
                $model->password = Hash::make($model->password);
            }
        });
    }
}
