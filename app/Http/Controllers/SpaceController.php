<?php

namespace App\Http\Controllers;

use App\Http\Requests\Space\StoreSpaceRequest;
use App\Http\Requests\Space\UpdateSpaceRequest;
use App\Models\Space;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

class SpaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Space::class);

        return response()->json([
            'data' => $request->user()->spaces,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSpaceRequest $request)
    {
        /** @var User */
        $user = $request->user();

        /** @var Space */
        $space = Space::firstOrCreate(
            [
                'created_by_id' => $user->id,
                'updated_by_id' => $user->id,
                'name' => $request->validated('name'),
            ],
            [
                'type' => $request->validated('type'),
            ]
        );

        if (! $space->wasRecentlyCreated) {
            throw ValidationException::withMessages([
                'name' => 'Space already exist',
            ]);
        }

        return back();
    }

    /**
     * Show the specified resource in storage.
     */
    public function show(Space $space)
    {
        Gate::authorize('view', [$space]);

        return response()->json(['data' => $space]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSpaceRequest $request, Space $space)
    {
        $space->update($request->validated());
        $space->refresh();

        return response()->json(['data' => $space]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Space $space, Request $request)
    {
        Gate::authorize('delete', $space);
        $forceDelete = $request->input('force', false) === true;

        if ($forceDelete && Gate::allows('forceDelete', [$space])) {
            $space->forceDelete();
        }

        $space->delete();

        return response()->noContent();
    }
}
