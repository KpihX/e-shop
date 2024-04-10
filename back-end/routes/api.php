<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Shop\CategorieController;
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

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users',UserController::class);
});


Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);

//Route pour afficher toutes les catégories
Route::post('categories', [CategorieController::class, 'index']);
Route::get('categories', [CategorieController::class, 'index']);
// Route pour afficher une catégorie spécifique
Route::get('/categories/{id}', [CategorieController::class, 'show']);
// Route pour créer une nouvelle catégorie
Route::post('/categories', [CategorieController::class, 'store']);
// Route pour mettre à jour une catégorie
Route::put('/categories/{id}', [CategorieController::class, 'update']);
// Route pour supprimer une catégorie
Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);
