<?php

namespace App\Http\Controllers;

use App\Http\Requests\Space\StoreSpaceRequest;
use App\Http\Requests\Space\UpdateSpaceRequest;
use App\Models\Space;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

class SpaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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
        $space = Space::firstOrCreate(['user_id' => $user->id, 'name' => $request->validated('name')]);

        if (! $space->wasRecentlyCreated) {
            throw new ConflictHttpException('Space already exist');
        }

        return response()->json([
            'data' => $space,
        ], JsonResponse::HTTP_CREATED);
    }

    /**
     * Show the specified resource in storage.
     */
    public function show(Space $space)
    {
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
        $forceDelete = $request->input('force', false) === true;

        if ($forceDelete && $request->user()->can('forceDelete', $space)) {
            $space->forceDelete();
        }

        $space->delete();

        return response()->noContent();
    }
}
