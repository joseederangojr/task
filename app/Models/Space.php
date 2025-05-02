<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/** @mixin Space */
class Space extends Model
{
    use Concerns\HasCreated, Concerns\HasUpdated;
    use HasFactory, SoftDeletes;

    public $sortable = [
        'order_column_name' => 'order',
        'ignore_timestamps' => true,
    ];

    protected $guarded = [];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class)->orderBy('column_id')->orderBy('order');
    }

    public function columns(): HasMany
    {
        return $this->hasMany(Column::class)->orderBy('order');
    }

    public function buildSortQuery(): Builder
    {
        return static::query()->where('space_id', $this->space_id);
    }
}
