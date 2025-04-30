<?php

namespace App\Actions;

use App\Data\ReorderTaskData;
use App\Models\Task;

class GetBetweenReorder
{
    public function handle(ReorderTaskData $reorder): array
    {
        return Task::query()
            ->where('order', '>=', $reorder->start)
            ->where('order', '<=', $reorder->end)
            ->whereColumnId($reorder->columnId)
            ->pluck('id')
            ->toArray();
    }
}
