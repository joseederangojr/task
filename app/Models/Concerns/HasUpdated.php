<?php

namespace App\Models\Concerns;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

trait HasUpdated
{
    public string $updatedByColumn = 'updated_by_id';

    public static function bootHasUpdated()
    {
        static::saving(function (Model $model) {
            if (method_exists($model, 'getUpdatedByColumn')) {
                $model->{$model->getUpdatedByColumn()} = auth()->user()->id;
            }
        });
    }

    public function getUpdatedByColumn()
    {
        return $this->updatedByColumn;
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, $this->getUpdatedByColumn());
    }
}
