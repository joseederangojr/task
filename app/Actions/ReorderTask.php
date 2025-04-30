<?php

namespace App\Actions;

use App\Data\MoveTaskData;
use App\Models\Task;

class ReorderTask
{
    public function __construct(private Task $task, private MoveTaskData $move) {}

    public function handle(): ReorderTaskUp|ReorderTaskDown
    {
        return $this->task->order - $this->move->order > 0
            ? new ReorderTaskUp
            : new ReorderTaskDown;
    }
}
