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
use App\Http\Requests\UpdateProduitRequest;
use App\Http\Resources\ProduitResource;
use App\Models\Photo;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProduitController extends Controller
{
    public function index()
    {
        $produits = Produit::with('photos')->get();
        return ProduitResource::collection($produits);
    }

    public function store(StoreProduitRequest $request)
    {
        $produit = DB::transaction(function () use ($request) {
            $produit = Produit::create($request->validated());

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('public/images');
                    $produit->photos()->create(['lienPhoto' => Storage::url($path)]);
                }
            }

            return $produit;
        });

        return new ProduitResource($produit);
    }

    public function show($id)
    {
        $produit = Produit::with('photos')->findOrFail($id);
        return new ProduitResource($produit);
    }

    public function update(UpdateProduitRequest $request, $id)
    {
        $produit = Produit::findOrFail($id);

        DB::transaction(function () use ($request, $produit) {
            $produit->update($request->validated());

            if ($request->hasFile('images')) {
                // First, delete old images
                foreach ($produit->photos as $photo) {
                    $filename = basename($photo->lienPhoto);
                    Storage::delete('public/images/' . $filename);
                    $photo->delete();
                }

                // Now, upload new images
                foreach ($request->file('images') as $image) {
                    $path = $image->store('public/images');
                    $produit->photos()->create(['lienPhoto' => Storage::url($path)]);
                }
            }
        });

        return new ProduitResource($produit);
    }

    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        
        DB::transaction(function () use ($produit) {
            foreach ($produit->photos as $photo) {
                $filename = basename($photo->lienPhoto);
                Storage::delete('public/images/' . $filename);
                $photo->delete();
            }

            $produit->delete();
        });

        return response()->json(null, 204);
    }
}

