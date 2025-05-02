<?php

namespace App\Actions;

use App\Models\Task;

class ReorderTask
{
    public function handle(int $columnId): void
    {
        $ids = Task::query()
            ->whereColumnId($columnId)
            ->orderBy('order')
            ->orderByDesc('updated_at')
            ->pluck('id');

        Task::setNewOrder($ids);
    }
}
