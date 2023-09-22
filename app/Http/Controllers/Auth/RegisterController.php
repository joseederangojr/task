<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterRequest $request)
    {
        /** @var User */
        $user = User::create($request->validated());

        $token = $user->createToken($user->email);

        return response()->json([
            'data' => [
                'authorization' => [
                    'token' => $token->plainTextToken,
                    'type' => 'bearer',
                ]
            ],
        ], JsonResponse::HTTP_CREATED);
    }
}
