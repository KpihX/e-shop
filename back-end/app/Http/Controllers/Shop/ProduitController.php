<?php

namespace App\Http\Controllers\Shop;

use App\Http\Resources\Shop\ProduitResource;
use App\Http\Requests\Shop\StoreProduitRequest;
use App\Http\Requests\Shop\UpdateProduitRequest;
use Illuminate\Http\Request;
use App\Models\Shop\Produit;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

// Définition de la classe ProduitController

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        // Récupérez l'identifiant de la catégorie à partir de la requête, s'il est présent
        $categoryId = $request->query('category');
        
    
        // Assurez-vous que la requête contient 'page'
        $page = $request->query('page', 1);

        $searchItem = $request->query('searchItem');
        // error_log("searchItem = " . $searchItem);
    
        // Créez une requête de base pour les produits
        $query = Produit::query();
    
        // Si un identifiant de catégorie est fourni, filtrez les produits par cette catégorie
        if ($categoryId && $categoryId != -1) {
            $query->where('idCategorie', $categoryId);
        }

        if ($searchItem) {
            $query->where('nomPro', 'like', '%' . $searchItem . '%');
        }
    
        // Paginez les produits, 10 par page
        $produits = $query->paginate(10, ['*'], 'page', $page);
    
        return ProduitResource::collection($produits);
    }

    // public function search (Request $request) {
    //     $searchItem = $request->query('searchItem');

    //     $categoryId = $request->query('category');

    //     $query = Produit::query();

    //     if ($categoryId && $categoryId != -1) {
    //         $query->where('idCategorie', $categoryId);
    //     }

    //     if ($searchItem) {
    //         $query->where('nomPro', 'like', '%' . $searchItem . '%');
    //     }

    //     $products = $query->paginate(10);

    //     return ProduitResource::collection($products);
    // }

    public function store(StoreProduitRequest $request)
    {
        $produit = Produit::create($request->validated());
        return new ProduitResource($produit);
    }

    public function show(Produit $produit)
    {
        return new ProduitResource($produit);
    }

    public function update(UpdateProduitRequest $request, Produit $produit)
    {
        $produit->update($request->validated());
        return new ProduitResource($produit);
    }

    public function destroy(Produit $produit)
    {
        $produit->delete();
        return response()->json(null, 204);
    }
}
