<?php

namespace App\Http\Controllers;

use App\Actions\MoveTask;
use App\Actions\ReorderTask;
use App\Data\MoveTaskData;
use App\Http\Requests\Task\MoveTaskRequest;
use App\Models\Task;

class TaskMoveController extends Controller
{
    public function __invoke(Task $task, MoveTaskRequest $request)
    {
        $move = new MoveTaskData(
            order: $request->validated('order'),
            columnId: $request->validated('column_id')
        );

        (new MoveTask)->handle(task: $task, move: $move);
        (new ReorderTask)->handle($move->columnId);

        if ($task->isDirty('column_id')) {
            (new ReorderTask)->handle($task->getOriginal('column_id'));
        }

        return back(status: 303);
    }
}
