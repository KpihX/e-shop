<?php

use App\Http\Controllers\GestionnaireController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientCarteController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\LigneCarteController;
use App\Http\Controllers\Shop\CategorieController;
use App\Http\Controllers\Shop\CommandeController;
use App\Http\Controllers\Shop\ProduitController;
use App\Http\Controllers\Shop\VilleController;
use App\Http\Requests\StoreFactureFromCommandeRequest;
use App\Models\ClientCarte;
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
        /** Direct routes */
        Route::apiResource('/facture', FactureController::class);
        Route::apiResource('/clientcarte', ClientCarteController::class);
        Route::apiResource('/lignecarte', LigneCarteController::class);

        Route::get('/clientcarte/search/{phone}', [ClientCarteController::class, 'searchByPhone']);

        /** Transformation or mixed routes */
        // Converts a command into a facture. make sure your payload is {'tva': ..., 'idCaissier': ...}. 
        // See StoreFactureFromCommandeRequest
        Route::post('/command/{commandId}/create-facture', [FactureController::class, 'createFromCommand']);

        // Create a facture with a new client carte
        // See StoreFactureWithNewClientCarteRequest
        Route::post('/facture/create-with-new-carte', [FactureController::class, 'createFactureWithNewCarte']);

        // Create a facture with an existing client carte
        // See StoreFactureWithClientCarteRequest
        Route::post('/facture/create-with-carte/{idCarte}', [FactureController::class, 'createFactureWithCarte']);

        // Create a facture without any client carte. 
        // See StoreFactureRequest
        Route::post('/facture/create-with-no-carte', [FactureController::class, 'createFactureWithNoCarte']);
    });
});

Route::post('login', [AuthController::class, 'login'])->name('login');;

// This is for the home page
Route::prefix('shop')->group(function () {
    Route::get('categories', [CategorieController::class, 'index']);
     // Routes pour les opérations CRUD sur les produits
    //  Route::apiResource('categories', ProduitController::class);
    
    // Route pour obtenir les produits paginés
    Route::get('products', [ProduitController::class, 'index']);

    // Route::get('search', [ProduitController::class, 'search']);

    // Route pour charger plus de produits0
    // Route::get('products/load-more', [ProduitController::class, 'loadMore']);
    // Routes pour les opérations CRUD sur les produits
    // Route::apiResource('produits', ProduitController::class);
    // Route::get('all_categories', [HomeController::class, 'getAllCategories'])->name('home.all_categories');
    // Route::get('products', [HomeController::class, 'getMoreProducts'])->name('home.more_products');
    // Route::get('search', [HomeController::class, 'searchProducts'])->name('home.search_products');
    // Route::get('categories', [HomeController::class, 'getMoreCategories'])->name('home.more_categories');

    //recuperer les villes
    Route::get('town', [VilleController::class, 'index']);

    Route::post('command', [CommandeController::class, 'store']);

    Route::get('pagination', function () {
        return response()->json([
            'perPage' => Config::get('pagination.perPage'),
        ]);
    });

    //Cart CRUD
    // Route::controller(CommandeController::class)->group(function(){
        
    //     Route::get('allCommands','allCommands');
    //     Route::post('command','command');
    //     Route::post('getLignesCommand,getLignesCommand');
    //     Route::post('getUserCommands,getLignesCommand');
    //     Route::post('ChangeCommandStatus,getLignesCommand');
    //     Route::delete('destroy/{code_pro}','destroy');
        
    // });
    
});

Route::prefix('admin')->group(function () {

    Route::post('login', [AuthController::class, 'loginAdmin']);
    Route::get('allCommands', [CommandeController::class, 'allCommands']);
    Route::get('getCommand', [CommandeController::class, 'getCommand']);
    Route::get('categories', [CategorieController::class, 'index']);
     // Routes pour les opérations CRUD sur les produits
    
    // Route pour obtenir les produits paginés
    Route::get('products', [ProduitController::class, 'index']);

});
