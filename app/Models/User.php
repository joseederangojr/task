<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Concerns\HashPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/** @mixin User */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HashPassword;

    protected $guarded = [];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function spaces(): HasMany
    {
        return $this->hasMany(Space::class, 'created_by_id');
    }

    public function assignedTask(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_to_id');
    }

    public function createdTask(): HasMany
    {
        return $this->hasMany(Task::class, 'created_by_id');
    }
}
