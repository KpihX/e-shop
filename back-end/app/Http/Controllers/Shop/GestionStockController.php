<?php

namespace App\Http\Controllers;
use App\Http\Resources\Shop\GestionStockResource;

use App\Http\Requests\StoreGestionStockRequest;
use App\Http\Requests\UpdateGestionStockRequest;
use App\Models\GestionStock;
use Illuminate\Http\Request;
class GestionStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $factures = GestionStock::all();
        return GestionStockResource::collection($factures);
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
    public function store(StoreGestionStockRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(GestionStock $gestionStock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GestionStock $gestionStock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGestionStockRequest $request, GestionStock $gestionStock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GestionStock $gestionStock)
    {
        //
    }
}
