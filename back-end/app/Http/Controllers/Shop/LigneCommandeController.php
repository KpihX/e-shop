<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateLigneCommandeRequest;
use App\Http\Resources\Shop\LigneCommandeResource;
use App\Models\Shop\LigneCommande;
use App\Models\Shop\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LigneCommandeController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store($ligneCommande, $idCommande)
    {
        $ligne = new LigneCommande();
        $produit = Produit::where('codePro', $ligneCommande['codePro'])->first();
        if($produit->qte - $ligneCommande['quantite']>=0){
            $ligne->disponible  = 1;
            $ligne->idCommande = $idCommande;
            $ligne->codePro = $ligneCommande['codePro'];
            $ligne->quantite = $ligneCommande['quantite'];
            $ligne->taille = $ligneCommande['taille'];
            $ligne->couleur = $ligneCommande['couleur'];
            $produit->qte -= $ligneCommande['quantite'];
            $produit->save();
            $ligne->save();
            return '';
        }else{
            $ligne->disponible  = 0;
            return 'Stock insuffisant : il ne reste que '.$produit->qte.' exemplaire(s) restant(s) pour le produit '.$produit->nomPro.'.\n';
        }
    }

    /**
     * Display the specified resource.
     */
    public function getLignesCommande($idCommande)
    {
        $lignesCommande = LigneCommande::where('idCommande',$idCommande)->get();
        return LigneCommandeResource::collection($lignesCommande, 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLigneCommandeRequest $request, LigneCommande $ligneCommande)
    {
        // On ne va pas se tuer!!!!!!!!!!!!!
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request){
        $data = Validator::make($request->all(), [
            'idLignCom' => 'required|integer',
        ]);
        if ($data->fails()) {
            return response()->json('Ligne Inexistante', 400);
        }
        $ligne = LigneCommande::where('idCommande', $request->idLignCom)->get();
        $ligne ->delete();   
        return response()->json('Ligne Supprimée', 200);
    }
}
