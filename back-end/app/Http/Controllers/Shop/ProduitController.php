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
        // Paginer les produits, 10 par page
        $page = $request->query('page', 1);
        $produits = Produit::paginate(10, ['*'], 'page', $page);
        return ProduitResource::collection($produits);
    }

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
