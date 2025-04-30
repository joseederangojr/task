<?php

namespace App\Models\Concerns;

use App\Models\User;

trait HasCreated
{
    public string $createdByColumn = 'created_by_id';

    public static function bootHasCreated()
    {
        static::saving(function ($model) {
            if (method_exists($model, 'getCreatedByColumn')) {
                $model->{$model->getCreatedByColumn()} = auth()->user()->id;
            }
        });
    }

    public function getCreatedByColumn()
    {
        return $this->createdByColumn;
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, $this->getCreatedByColumn());
    }
}
