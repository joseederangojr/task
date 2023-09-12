<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Model;

trait HasCreated
{
    use ModelTrait;

    public static function bootHasCreated()
    {
        static::saving(function (Model $model) {
            if (! $model->created_by_id) {
                $model->created_by_id = auth()->user()->id;
            }
        });
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }
}
