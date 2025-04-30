<?php

namespace App\Actions;

use App\Models\Task;
use Illuminate\Support\Facades\DB;

class ReorderTaskUp
{
    public function handle(array $ids)
    {
        Task::query()
            ->whereIn('id', $ids)
            ->update([
                'order' => DB::raw('`order` + 1'),
            ]);
    }
}
