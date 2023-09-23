<?php

use App\Http\Controllers\Auth\SignInController;
use App\Http\Controllers\Auth\SignUpController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('home/page');
})->name('home')->middleware('auth');

Route::get('signin', [SignInController::class, 'page'])->name('signin')->middleware('guest');
Route::get('signup', [SignUpController::class, 'page'])->name('signup')->middleware('guest');
