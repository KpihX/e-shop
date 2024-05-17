<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFactureFromCommandeRequest;
use App\Http\Requests\StoreFactureRequest;
use App\Http\Requests\UpdateFactureRequest;
use App\Http\Resources\FactureResource;
use App\Models\Facture;
use App\Models\LigneFacture;
use App\Models\Shop\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

// use Illuminate\Support\Facades\Request;

class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $factures = Facture::latest()->paginate(10);
        //On définit la pagination
        $page = $request->query('page', 1);
        $perPage = Config::get('pagination.perPageAdmin');
        $factures = Facture::latest()->paginate($perPage, ['*'], 'page', $page);

        return FactureResource::collection($factures);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFactureRequest $request)
    {
        $data = $request->validated();

        // Create a new facture instance
        $facture = Facture::create($data);

        // Return the newly created facture as FactureResource
        return new FactureResource($facture);
    }

    /**
     * Gets the Factures and all its ligneFactures
     */
    public function show(string $id)
    {
        // Retrieve the Facture model instance by its id along with its lignesFactures relationship
        $facture = Facture::with('lignesFactures')->findOrFail($id);

        // Return the FactureResource including the loaded lignesFactures
        return new FactureResource($facture);
    }

    /**
     * This functions takes a commandeId and some other data about the facture, then uses it to convert he commande into the facture in a transaction. We return the newly created facture after
     */
    public function convertCommandeToFacture(StoreFactureFromCommandeRequest $request, string $commandeId)
    {
        $data = $request->validated();

        $facture = DB::transaction(function () use ($commandeId, $data) {
            // Retrieve the Commande and its associated LignesCommande
            $commande = Commande::with('lignesCommande')->findOrFail($commandeId);

            $factureData = $commande->toFactureData($data);
            $facture = Facture::create($factureData);

            foreach ($commande->lignesCommande as $ligneCommande) {
                LigneFacture::create($ligneCommande->toFactureLigneData($facture->idFac));
            }

            return $facture;
        });

        $facture->load('lignesFactures');
        return new FactureResource($facture);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFactureRequest $request, string $id)
    {
        $data = $request->validated();
        // Find the facture by id
        $facture = Facture::findOrFail($id);

        // Update the facture
        $facture->update($data);

        // Return the updated facture as FactureResource
        return new FactureResource($facture);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Use a transaction to ensure both Facture and its associated LigneFactures are deleted atomically
        DB::transaction(function () use ($id) {
            // Retrieve the Facture model instance by its id
            $facture = Facture::findOrFail($id);

            // Delete associated LigneFactures
            $facture->lignesFactures()->delete();

            // Delete the Facture
            $facture->delete();
        });

        // Return a response indicating the deletion was successful
        return response()->json(['message' => 'La factures a ete detruite.'], 200);
    }
}
