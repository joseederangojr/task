<?php

use App\Models\Space;
use App\Models\User;

describe('SpaceController', function () {
    it('should list spaces for user', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        Space::factory(2)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/space');

        $response->assertOk();
        $response->assertJsonCount(2, 'data');
    });

    it('should create space for user', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        Space::factory()->create(['user_id' => $user->id, 'name' => 'exist']);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/space', ['name' => 'test']);

        $response->assertCreated();
        $response->assertJsonPath('data.name', 'test');
    });

    it('should return conflict duplicate space', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        Space::factory()->create(['user_id' => $user->id, 'name' => 'exist']);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/space', ['name' => 'exist']);

        $response->assertConflict();
        $response->assertJsonPath('message', 'Space already exist');
    });

    it('should create duplicate space name for different user', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        Space::factory()->create(['user_id' => User::factory()->create()->id, 'name' => 'exist']);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/space', ['name' => 'exist']);

        $response->assertCreated();
        $response->assertJsonPath('data.name', 'exist');
    });

    it('should update space for user', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $ownedSpace = Space::factory()->create(['user_id' => $user->id, 'name' => 'owned']);
        $currentOwnedSpaceName = $ownedSpace->name;

        $response = $this->actingAs($user, 'sanctum')->patchJson("/api/space/{$ownedSpace->id}", ['name' => 'updated']);

        $response->assertOk();
        $response->assertJsonPath('data.name', 'updated');
        expect($currentOwnedSpaceName)->not->toBe($response['data']['name']);
    });

    it('should not update not owned space', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $notOwnedSpace = Space::factory()->create(['user_id' => User::factory()->create()->id, 'name' => 'not owned']);

        $response = $this->actingAs($user, 'sanctum')->patchJson("/api/space/{$notOwnedSpace->id}", ['name' => 'updated']);

        $response->assertForbidden();
    });

    it('should soft delete spaces', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $ownedSpace = Space::factory()->create(['user_id' => $user->id, 'name' => 'owned']);

        $response = $this->actingAs($user, 'sanctum')->deleteJson("/api/space/{$ownedSpace->id}");

        $softDeleted = Space::withTrashed()->find($ownedSpace->id);
        $response->assertNoContent();
        expect($softDeleted)->not->toBeNull();
    });

    it('should delete spaces', function () {
        /** @var Tests\TestCase $this */
        $user = User::factory()->create();
        $ownedSpace = Space::factory()->create(['user_id' => $user->id, 'name' => 'owned']);

        $response = $this->actingAs($user, 'sanctum')->deleteJson("/api/space/{$ownedSpace->id}", ['force' => true]);

        $softDeleted = Space::withTrashed()->find($ownedSpace->id);
        $response->assertNoContent();
        expect($softDeleted)->toBeNull();
    });
});
