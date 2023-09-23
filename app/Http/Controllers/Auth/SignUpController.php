<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignUpRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SignUpController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SignUpRequest $request)
    {
        /** @var User */
        $user = User::create($request->except('password_confirmation'));

        $token = $user->createToken($user->email.'|'.$request->ip());
        Auth::attempt($request->only(['email', 'password']));
        $request->session()->regenerate();

        return response()->json([
            'data' => [
                'authorization' => [
                    'token' => $token->plainTextToken,
                    'type' => 'bearer',
                ],
            ],
        ], JsonResponse::HTTP_CREATED);
    }

    public function page()
    {
        return Inertia::render('auth/signup/page');
    }
}
