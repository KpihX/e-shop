<?php

use App\Http\Controllers\GestionnaireController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\Shop\CategorieController;
use App\Http\Controllers\Shop\CommandeController;
use App\Http\Controllers\Shop\ProduitController;
use App\Http\Controllers\Shop\VilleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;


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

    Route::get('gestionnaire', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('gestionnaires', GestionnaireController::class);

    // Contains all the backend routes and requires authentication
    Route::prefix('admin')->group(function () {
        Route::apiResource('/factures', FactureController::class);
        Route::post('/commandes/{command}/create-facture', [FactureController::class, 'createFromCommand']);
    });
});

Route::post('login', [AuthController::class, 'login'])->name('login');;

// This is for the home page
Route::prefix('shop')->group(function () {
    Route::get('categories', [CategorieController::class, 'index']);
    // Route pour obtenir les produits paginés
    Route::get('products', [ProduitController::class, 'index']);
    Route::get('town', [VilleController::class, 'index']);
    Route::post('command', [CommandeController::class, 'store']);
    Route::get('pagination', function () {
        return response()->json([
            'perPage' => Config::get('pagination.perPage'),
        ]);
    });
});
