<?php

namespace App\Actions;

use App\Data\MoveTaskData;
use App\Models\Task;

class MoveTask
{
    public function handle(Task $task, MoveTaskData $move): void
    {
        $task->update([
            'order' => $move->order,
            'column_id' => $move->columnId,
        ]);
    }
}
