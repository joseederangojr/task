<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

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

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HashPassword;

    protected $guarded = [];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function spaces()
    {
        return $this->hasMany(Space::class, 'created_by_id');
    }

    public function assignedTask()
    {
        return $this->hasMany(Task::class, 'assigned_to_id');
    }

    public function createdTask()
    {
        return $this->hasMany(Task::class, 'created_by_id');
    }
}
