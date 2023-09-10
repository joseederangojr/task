<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        /** @var User */
        $user = User::where('email', $request->validated('email'))->first();

        if (! $user || ! Hash::check($request->validated('password'), $user->password)) {
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
}
