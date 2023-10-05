<?php

use App\Models\Space;
use App\Models\Task;
use App\Models\User;

describe('SpaceTaskController', function () {
    it('should list tasks for spaces', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $space = Space::factory()->create([
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);
        $tasks = Task::factory(5)->create([
            'space_id' => $space->id,
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);

        $response = $this->actingAs($user)->getJson("/api/space/$space->id/task");

        $response->assertOk();
        $response->assertJsonCount(count($tasks), 'data');
    });

    it('should return forbidden to list tasks for spaces', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();

        $anotherUser = User::factory()->create();
        $notOwnedSpace = Space::factory()->create([
            'created_by_id' => $anotherUser->id,
            'updated_by_id' => $anotherUser->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')->getJson("/api/space/$notOwnedSpace->id/task");

        $response->assertForbidden();
        $response->assertJson(['message' => 'This action is unauthorized.']);
    });

    it('should create task', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $space = Space::factory()->create([
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);

        $data = [
            'title' => 'Test Task',
            'description' => 'with description',
            'status' => 'triage',
        ];

        $response = $this->actingAs($user, 'sanctum')->postJson("/api/space/$space->id/task", $data);

        $response->assertCreated();
    });

    it('should return validation error on create', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $space = Space::factory()->create([
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);

        $data = [];

        $response = $this->actingAs($user, 'sanctum')->postJson("/api/space/$space->id/task", $data);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors('title');
    });

    it('should show task by id', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $space = Space::factory()->create([
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);
        $task = Task::factory()->create([
            'space_id' => $space->id,
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')->getJson("/api/space/$space->id/task/$task->id");

        $response->assertOk();
        $response->assertJsonFragment(['id' => $task->id, 'title' => $task->title, 'status' => $task->status]);
    });

    it('should return forbidden to show task by id', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $space = Space::factory()->create([
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);
        $task = Task::factory()->create([
            'space_id' => $space->id,
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);

        $anotherUser = User::factory()->create();
        $notOwnedSpace = Space::factory()->create([
            'created_by_id' => $anotherUser->id,
            'updated_by_id' => $anotherUser->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')->getJson("/api/space/$notOwnedSpace->id/task/$task->id");

        $response->assertForbidden();
        $response->assertJson(['message' => 'This action is unauthorized.']);
    });

    it('should update task', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $space = Space::factory()->create([
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);
        $task = Task::factory()->create([
            'space_id' => $space->id,
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')->patchJson("/api/space/$space->id/task/$task->id", [
            'title' => 'updated title',
        ]);

        $response->assertOk();
        $response->assertJsonFragment(['id' => $task->id, 'title' => 'updated title', 'status' => $task->status]);
    });

    it('should return validation errors update task', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $space = Space::factory()->create([
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);
        $task = Task::factory()->create([
            'space_id' => $space->id,
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')->patchJson("/api/space/$space->id/task/$task->id", []);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['title']);
    });

    it('should return forbidden to update task by id', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $space = Space::factory()->create([
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);
        $task = Task::factory()->create([
            'space_id' => $space->id,
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
            'title' => 'forbidden',
        ]);

        $anotherUser = User::factory()->create();
        $notOwnedSpace = Space::factory()->create([
            'created_by_id' => $anotherUser->id,
            'updated_by_id' => $anotherUser->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')->patchJson("/api/space/$notOwnedSpace->id/task/$task->id", [
            'title' => 'forbidden title',
        ]);

        $response->assertForbidden();
        $response->assertJson(['message' => 'This action is unauthorized.']);
    });

    it('should soft delete task', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $space = Space::factory()->create(['created_by_id' => $user->id, 'updated_by_id' => $user->id, 'name' => 'owned']);

        $task = Task::factory()->create([
            'space_id' => $space->id,
            'created_by_id' => $user->id,
            'updated_by_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')->deleteJson("/api/space/{$space->id}/task/$task->id");

        $softDeleted = Task::withTrashed()->find($task->id);
        $response->assertNoContent();
        expect($softDeleted)->not->toBeNull();
    });
});
