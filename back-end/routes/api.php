<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LigneCarteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Shop\CategorieController;
use App\Http\Controllers\Shop\CommandeController;
use App\Http\Controllers\Shop\ProduitController;
use App\Http\Controllers\Shop\VilleController;
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
Route::prefix('/shop')->group(function () {
    Route::get('categories', [CategorieController::class, 'index']);
     // Routes pour les opérations CRUD sur les produits
    //  Route::apiResource('categories', ProduitController::class);
    
    // Route pour obtenir les produits paginés
    Route::get('products', [ProduitController::class, 'index']);

    Route::get('search', [ProduitController::class, 'search']);

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

    Route::post('command', [CommandeController::class, 'command']);
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
