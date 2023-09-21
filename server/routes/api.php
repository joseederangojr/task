<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\SpaceTaskController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('signin', Auth\SignInController::class)->name('auth.signin')->middleware('guest');
    Route::post('register', Auth\RegisterController::class)->middleware('guest');
    Route::get('whoami', Auth\WhoAmIController::class)->middleware('auth:sanctum');
});

Route::apiResource('space', SpaceController::class)->middleware('auth:sanctum');
Route::apiResource('space.task', SpaceTaskController::class)->middleware('auth:sanctum');
