<?php

use App\Http\Controllers\Auth\SignInController;
use App\Http\Controllers\Auth\SignUpController;
use App\Http\Controllers\SpaceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn () => redirect()->route('web.space.index'))
    ->name('home')
    ->middleware('auth');

Route::resource('space', SpaceController::class)
    ->only(['show', 'index'])
    ->middleware('auth');

Route::name('auth.')->group(function () {
    Route::get('signin', [SignInController::class, 'page'])
        ->name('signin')
        ->middleware('guest');
    Route::get('signup', [SignUpController::class, 'page'])
        ->name('signup')
        ->middleware('guest');
});
