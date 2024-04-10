<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// This is for the home page
Route::prefix('api/shop')->group(function () {
    Route::get('all_categories', [HomeController::class, 'getAllCategories'])->name('home.all_categories');
    Route::get('products', [HomeController::class, 'getMoreProducts'])->name('home.more_products');
    Route::get('search', [HomeController::class, 'searchProducts'])->name('home.search_products');
    Route::get('categories', [HomeController::class, 'getMoreCategories'])->name('home.more_categories');
});
