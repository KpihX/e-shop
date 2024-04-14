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
     * Display a listing of the resource.
     */
    public function allCommands()
    {
        $commandes = Commande::all();
        if($commandes){
            foreach($commandes as $commande){
                foreach($commande->items as $ligneCommande){
                    $produit = Produit::where('id',$ligneCommande->codePro)->pluck('name');
                    $ligneCommande->nomPro=$produit['0'];
                }
            }
            return CommandeResource::collection($commandes, 200);
        }else return response()->json('Pas de commande');
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function command(StoreCommandeRequest $request)
    {
        try{
        if(!$request->validated()){
            return response()->json('veuillez remplir tous les champs', 400);
        }
        $commande=new Commande();
        $commande->idVille=$request->client['idVille'];
        $commande->nomClient=$request->client['nomCient'];
        $commande->mobile=$request->client['mobile'];
        $commande->montant=$request->montant;
        $commande->dateCom=now();
        $commande->save();

        foreach($request->produits as $lignesCommande){
            $ligne = new LigneCommande();
            $ligne->idCommande=$commande->idCommande;
            $ligne->codePro=$lignesCommande['codePro'];
            $ligne->quantite=$lignesCommande['quantite'];
            $ligne->taille = $lignesCommande['taille'];
            $ligne->couleur = $lignesCommande['couleur'];
            $ligne->save();
            $produit = Produit::where('id',$lignesCommande['codePro'])->first();
            $produit->stock -= $lignesCommande['quantite'];
            $produit->save();
        }
        return response()->json('commande crée', 201);
        }catch(\Exception $e){
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