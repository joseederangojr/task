<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignUpRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SignUpController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SignUpRequest $request)
    {
        /** @var User $user */
        $user = User::create($request->except('password_confirmation'));

        Auth::login($user, false);

        $user->spaces()->create([
            'name' => $user->name,
        ]);

        return response()->redirectTo(route('web.space.index'));
    }

    public function page()
    {
        return Inertia::render('auth/signup/page');
    }
}
