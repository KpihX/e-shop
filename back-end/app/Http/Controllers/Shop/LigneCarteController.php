<?php

namespace App\Http\Controllers;

<<<<<<< Updated upstream
use App\Http\Requests\StoreClientCarteRequest;
=======
use Illuminate\Http\Request;
use App\Http\Requests\StoreLigneCarteRequest;
>>>>>>> Stashed changes
use App\Http\Requests\UpdateLigneCarteRequest;
use App\Models\LigneCarte;

class LigneCarteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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
    public function store(StoreLigneCarteRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LigneCarte $ligneCarte)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LigneCarte $ligneCarte)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLigneCarteRequest $request, LigneCarte $ligneCarte)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LigneCarte $ligneCarte)
    {
        //
    }
}
