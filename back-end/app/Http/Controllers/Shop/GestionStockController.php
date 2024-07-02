<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Resources\Shop\GestionStockResource;
use App\Http\Requests\Shop\StoreGestionStockRequest;
use App\Http\Requests\Shop\UpdateGestionStockRequest;
use App\Models\Shop\GestionStock;
use Error;
use Exception;
use Illuminate\Http\Request;

class GestionStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $history = GestionStock::all();
        return GestionStockResource::collection($history);
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
    public function store(Request $request)
{   
    try {
        $validatedData = $request->validate([
            'codePro' => 'required',
            'qte' => 'required|integer|min:1',
            'idGest' => 'required|integer',
            'dateStock' => 'required|date', // Adjusted to 'date'
            'operation' => 'required|integer'
        ]);

        GestionStock::create($validatedData);
        error_log('okay');
        return response()->json("success");
    } catch (Exception $e) {
        error_log("Error occurred: " . $e->getMessage());
        return response()->json($e->getMessage(), 500); // Return the error message
    }
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
