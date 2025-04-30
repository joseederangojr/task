<?php

namespace App\Data;

use App\Models\Task;

class ReorderTaskData
{
    public int $columnId;

    public int $start;

    public int $end;

    public function __construct(Task $task, MoveTaskData $move)
    {
        $moveUpward = $task->order - $move->order > 0;
        $this->columnId = $task->column_id;
        $this->start = $moveUpward ? $move->order : $task->order + 1;
        $this->end = $moveUpward ? $task->order - 1 : $move->order - 1;
    }
}
