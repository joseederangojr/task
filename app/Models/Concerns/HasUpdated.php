<?php

namespace App\Models\Concerns;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

trait HasUpdated
{
    public static function bootHasUpdated()
    {
        static::saving(function (Model $model) {
            if (! $model->updated_by_id) {
                $model->updated_by_id = auth()->user()->id;
            }
        });
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
