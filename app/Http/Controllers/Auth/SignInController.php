<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignInRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class SignInController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SignInRequest $request)
    {
        if (! Auth::attempt($request->validated())) {
            throw new BadRequestHttpException('Invalid email or password');
        }

        /** @var User $user */
        $user = Auth::user();
        $request->session()->regenerate();
        $token = $user->createToken($request->validated('email').'|'.$request->ip());

        return response()->json([
            'data' => [
                'authorization' => [
                    'token' => $token->plainTextToken,
                    'type' => 'bearer',
                ],
            ],
        ]);
    }

    public function page()
    {
        return Inertia::render('auth/signin/page');
    }
}
