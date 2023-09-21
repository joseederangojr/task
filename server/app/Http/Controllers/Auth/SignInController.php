<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignInRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class SignInController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SignInRequest $request)
    {
        /** @var User */
        $user = User::where('email', $request->validated('email'))->first();

        if (!$user || !Hash::check($request->validated('password'), $user->password)) {
            throw new BadRequestHttpException('Invalid email or password');
        }

        $token = $user->createToken($request->validated('email'));

        return response()->json([
            'data' => [
                'authorization' => [
                    'token' => $token->plainTextToken,
                    'type' => 'bearer',
                ],
                'user' => $user,
            ],
        ]);
    }

    public function page()
    {
        return Inertia::render('auth/signin/page');
    }
}
