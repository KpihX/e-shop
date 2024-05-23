<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Shop\ClientCarteController;
use App\Http\Controllers\Shop\FactureController;
use App\Http\Controllers\Shop\LigneCarteController;
use App\Http\Controllers\Shop\CategorieController;
use App\Http\Controllers\Shop\CommandeController;
use App\Http\Controllers\Shop\ProduitController;
use App\Http\Controllers\Shop\PhotoController;
use App\Http\Controllers\Shop\VilleController;
use App\Http\Controllers\GestionnaireController;
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

    Route::prefix('admin')->group(function () {
        Route::apiResource('/facture', FactureController::class);
        Route::apiResource('/clientcarte', ClientCarteController::class);
        Route::apiResource('/lignecarte', LigneCarteController::class);
        Route::get('/clientcarte/search/{phone}', [ClientCarteController::class, 'searchByPhone']);
        Route::post('/command/{commandId}/create-facture', [FactureController::class, 'createFromCommand']);
        Route::post('/facture/create-with-new-carte', [FactureController::class, 'createFactureWithNewCarte']);
        Route::post('/facture/create-with-carte/{idCarte}', [FactureController::class, 'createFactureWithCarte']);
        Route::post('/facture/create-with-no-carte', [FactureController::class, 'createFactureWithNoCarte']);
        Route::post('login', [AuthController::class, 'loginAdmin']);
        Route::get('allCommands', [CommandeController::class, 'allCommands']);
        Route::get('getCommand', [CommandeController::class, 'getCommand']);
        Route::post('updateCommand/{idCommande}', [CommandeController::class, 'updateCommand']);
        Route::get('categories', [CategorieController::class, 'index']);
        Route::get('products', [ProduitController::class, 'index']);
        Route::post('destroyCommand/{idCommande}', [CommandeController::class, 'destroy']);
        Route::post('storeProduct', [ProduitController::class, 'store']);
        Route::post('updateProduct/{codePro}', [ProduitController::class, 'update']);
        Route::post('addCategorie', [CategorieController::class, 'store']);
        Route::Post('destroyProduct/{codePro}', [ProduitController::class, 'destroy']);
        Route::Post('destroyPhoto/{idPhoto}', [PhotoController::class, 'destroy']);
        Route::get('getPhotos', [PhotoController::class, 'getPhotos']);
        Route::post('/upload', [PhotoController::class, 'store']);
    });
});

Route::post('login', [AuthController::class, 'login'])->name('login');

Route::prefix('shop')->group(function () {
    Route::get('categories', [CategorieController::class, 'index']);
    Route::get('products', [ProduitController::class, 'index']);
    Route::get('town', [VilleController::class, 'index']);
    Route::post('command', [CommandeController::class, 'store']);
    Route::get('pagination', function () {
        return response()->json([
            'perPage' => Config::get('pagination.perPage'),
        ]);
    });
});

