<?php

namespace App\Policies;

use App\Models\Space;
use App\Models\User;

class SpacePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        return $user != null;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Space $space): bool
    {
        return $space->created_by_id == $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(?User $user): bool
    {
        return $user != null;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Space $space): bool
    {
        return $user->id == $space->created_by_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Space $space): bool
    {
        return $space->created_by_id == $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Space $space): bool
    {
        return $space->created_by_id == $user->id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Space $space): bool
    {
        return $space->created_by_id == $user->id;
    }
}
