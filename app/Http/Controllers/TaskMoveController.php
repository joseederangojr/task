<?php

namespace App\Http\Controllers;

use App\Actions\GetBetweenReorder;
use App\Actions\MoveTask;
use App\Actions\ReorderTask;
use App\Data\MoveTaskData;
use App\Data\ReorderTaskData;
use App\Http\Requests\Task\MoveTaskRequest;
use App\Models\Task;

class TaskMoveController extends Controller
{
    public function __invoke(Task $task, MoveTaskRequest $request)
    {
        $move = new MoveTaskData(
            order: $request->validated('to_order'),
            columnId: $request->validated('to_column_id')
        );

        // Case Upward: from order 9 moving to order 3 /// 9 - 3 = 6
        // Case Downward: from order 3 moving to order 9 /// 3 - 9 = -6
        $reorderData = new ReorderTaskData(task: $task, move: $move);
        $reorder = new ReorderTask(task: $task, move: $move);
        $inBetween = (new GetBetweenReorder)->handle(reorder: $reorderData);
        (new MoveTask)->handle(task: $task, move: $move);
        $reorder->handle($inBetween);

        return back(status: 303);
    }
}
