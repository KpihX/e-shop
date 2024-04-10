<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Shop\CategorieController;
use App\Http\Controllers\Shop\ProduitController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('/shop')->group(function () {
    Route::get('categories', [CategorieController::class, 'index']);
     // Routes pour les opérations CRUD sur les produits
    //  Route::apiResource('categories', ProduitController::class);
    
    // Route pour obtenir les produits paginés
    Route::get('products', [ProduitController::class, 'index']);
});