<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{AuthController, UserController, ProfileController};

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/password-email', [AuthController::class, 'sendResetCodeEmail'])->name('passwordEmail');
    Route::post('password-reset', [AuthController::class, 'resetPassword'])->name('passwordReset');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api')->name('me');
    Route::get('/checkauth', [AuthController::class, 'checkauth'])->middleware('auth:api')->name('checkAuth');
    Route::post('/email-verify', [AuthController::class, 'emailVerify'])->middleware('auth:api')->name('emailVerify');
    Route::post('/change-password', [AuthController::class, 'changePassword'])->middleware('auth:api')->name('changePassword');
    Route::post('/password-update', [AuthController::class, 'resetPassword'])->name('passwordUpdate'); // Corrigido o nome da rota
    Route::post('/resend-code-email-verification', [AuthController::class, 'resendCodeEmailVerification'])->middleware('auth:api')->name('verification.resend'); // Corrigido o nome da rota
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function ($router) {
    Route::get('/', [UserController::class, 'list'])->name('user.list');
    Route::get('/{id}', [UserController::class, 'show'])->name('user.show'); 
    Route::post('/new', [UserController::class, 'store'])->name('user.store');
    Route::post('/{user}', [UserController::class, 'update'])->name('user.update'); // Deve ser post por causa da imagem
    Route::delete('/{id}', [UserController::class, 'destroy'])->name('user.destroy');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'profile'
], function ($router) {
<<<<<<< HEAD
    Route::get('/', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/{id}', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('/', [ProfileController::class, 'store'])->name('profile.store'); // Adicionando a rota para o método store
=======
    Route::get('/', [ProfileController::class, 'list'])->name('profile.list');
    Route::get('/{id}', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('/', [ProfileController::class, 'store'])->name('profile.store');
>>>>>>> main
    Route::put('/{id}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/{id}', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
