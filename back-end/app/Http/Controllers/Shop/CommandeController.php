<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shop\StoreCommandeRequest;
use App\Http\Resources\Shop\CommandeResource;
use App\Models\Shop\Commande;
use App\Models\Shop\Produit;
use App\Models\Shop\LigneCommande;

class CommandeController extends Controller
{
    /**
     * Return all the commands.
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function allCommands()
    {
        $commandes = Commande::all();
        if ($commandes) {
            // Get all the commandes
            // Add the name of the product to each ligneCommande
            foreach ($commandes as $commande) {
                foreach ($commande->items as $ligneCommande) {
                    $produit = Produit::where('id', $ligneCommande->codePro)->pluck('name');
                    $ligneCommande->nomPro = $produit['0'];
                }
            }
            // Return all the commandes with their items and products
            return CommandeResource::collection($commandes, 200);
        }
        // If there are no commandes return an error message
        return response()->json('Pas de commande', 404);
    }


    /**
     * Store a newly created resource in storage.
     * 
     * @param StoreCommandeRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function command(StoreCommandeRequest $request)
    {
        try {
            $client = $request->query('client');
            $produits = $request->query('produits');
            $montant = $request->query('montant');
            error_log($client);
            error_log($produits);
            error_log($montant);
            
            //Check if the request is valid
            // if (!$request->validated()) {
            //     return response()->json('veuillez remplir tous les champs', 400);
            // }

            

            // Create a new Commande
            $commande = new Commande();
            $commande->idVille = 1;//$client['idVille'];
            $commande->nomClient = "Tamo";//$client['nomClient'];
            $commande->mobile = "678"; //$client['mobile'];
            $commande->montant = 458;//$montant;
            error_log("Hi");
            $commande->adresse = "ras";//$client['adresse'];
            $commande->dateCom = now();
            
            $commande->save();

            // Create a new ligne de commande for each produit in the request
            // foreach ($produits as $lignesCommande) {
            //     $ligne = new LigneCommande();
            //     $ligne->idCommande = $commande->idCommande;
            //     $ligne->codePro = $lignesCommande['codePro'];
            //     $ligne->quantite = $lignesCommande['quantite'];
            //     $ligne->taille = $lignesCommande['taille'];
            //     $ligne->couleur = $lignesCommande['couleur'];
            //     $ligne->save();

            //     // Update the stock of each produit
            //     $produit = Produit::where('id', $lignesCommande['codePro'])->first();
            //     $produit->stock -= $lignesCommande['quantite'];
            //     $produit->save();
            // }

            // Return a success message
            return response()->json('commande crée', 201);
        } catch (\Exception $e) {
            // Return an error message
            return response()->json($e->getMessage(), 400);
        }
    }

    public function getLignesCommand(){

    }

    public function getUserCommands(){

    }
    public function changeCommandStatus(){
        
    }
    public function destroy(){

    }

}