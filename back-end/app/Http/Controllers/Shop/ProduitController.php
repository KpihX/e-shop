<?php

// namespace App\Http\Controllers;

// use App\Http\Requests\StoreProduitRequest;
// use App\Http\Requests\UpdateProduitRequest;
// use App\Models\Produit;

// class ProduitController extends Controller
// {
//     /**
//      * Display a listing of the resource.
//      */
//     public function index()
//     {
//         $produit = Produit::all();
//     }

//     /**
//      * Show the form for creating a new resource.
//      */
//     public function create()
//     {
//     }

//     /**
//      * Store a newly created resource in storage.
//      */
//     public function store(StoreProduitRequest $request)
//     {
//         //
//     }

//     /**
//      * Display the specified resource.
//      */
//     public function show(Produit $produit)
//     {
//         //
//     }

//     /**
//      * Show the form for editing the specified resource.
//      */
//     public function edit(Produit $produit)
//     {
//         //
//     }

//     /**
//      * Update the specified resource in storage.
//      */
//     public function update(UpdateProduitRequest $request, Produit $produit)
//     {
//         //
//     }

//     /**
//      * Remove the specified resource from storage.
//      */
//     public function destroy(Produit $produit)
//     {
//         //
//     }
// }

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduitRequest;
use app\Http\Requests\UpdateProduitRequest;
use App\Http\Resources\ProduitResource;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProduitController extends Controller
{
    // Display a listing of the products.
    public function index()
    {
        $produits = Produit::with('photos')->get();
        return ProduitResource::collection($produits);
    }

    // Store a newly created product in storage.
    public function store(StoreProduitRequest $request)
    {
        $produit = DB::transaction(function () use ($request) {
            $produit = Produit::create($request->validated());

            // Handle file upload
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('public/images'); // Returns the file path
                    $produit->photos()->create(['lienPhoto' => $path]);
                }
            }

            return $produit;
        });

        return new ProduitResource($produit);
    }

    // Display the specified product.
    public function show($id)
    {
        $produit = Produit::with('photos')->findOrFail($id);
        return new ProduitResource($produit);
    }

    // Update the specified product in storage.
    public function update(UpdateProduitRequest $request, $id)
    {
        $produit = Produit::findOrFail($id);
        $produit->update($request->validated());
        
        // Handle file upload if needed
        // ...

        return new ProduitResource($produit);
    }

    // Remove the specified product from storage.
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        DB::transaction(function () use ($produit) {
            // Delete associated photos if needed
            // ...
            $produit->delete();
        });
        
        return response()->json(null, 204); // No content
    }
}
