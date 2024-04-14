<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorevilleRequest;
use App\Http\Requests\UpdatevilleRequest;
use App\Http\Resources\Shop\villeResource;
use App\Models\Shop\ville;

class VilleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $villes = ville::all();
        if($villes->count() == 0){
            return response()->json([
                'message' => 'Aucune ville trouvée'
            ], 500);
        }
        return villeResource::collection($villes);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorevilleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ville $ville)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ville $ville)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatevilleRequest $request, ville $ville)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ville $ville)
    {
        //
    }
}
