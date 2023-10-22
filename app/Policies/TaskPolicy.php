<?php

namespace App\Policies;

use App\Models\Space;
use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function viewAny(User $user, Space $space): bool
    {
        return $user->id === $space->created_by_id;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task, Space $space): bool
    {
        return $user->id === $space->created_by_id && $task->space_id === $space->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Space $space): bool
    {
        return $user->id === $space->created_by_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task, Space $space): bool
    {
        return $task->space_id === $space->id &&
            ($user->id === $task->created_by_id || $user->id === $task->assigned_to_id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task, Space $space): bool
    {
        return $task->space_id === $space->id &&
            ($user->id === $task->created_by_id || $user->id === $task->assigned_to_id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Task $task, Space $space): bool
    {
        return $task->space_id === $space->id &&
            ($user->id === $task->created_by_id || $user->id === $task->assigned_to_id);
    }
}
