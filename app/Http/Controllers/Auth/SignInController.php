<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignInRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class SignInController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SignInRequest $request)
    {
        if (
            ! Auth::attempt(
                $request->only('email', 'password'),
                $request->validated('remember', false)
            )
        ) {
            throw ValidationException::withMessages([
                'email' => 'Invalid email or password',
            ]);
        }

        return response()->redirectTo(route('web.home'));
    }

    public function page()
    {
        return Inertia::render('auth/signin/page');
    }
}
