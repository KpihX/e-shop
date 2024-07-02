<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shop\StoreGestionStockRequest;
use App\Http\Requests\UpdateLigneCommandeRequest;
use App\Http\Resources\LigneCommandeResource;
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
        $formatedData = [
            'codePro' => '',
            'idGest' => 2,
            'qte' => 0,
            'dateStock' => null,
            'operation' => 0
        ];
        $produit = Produit::where('codePro', $ligneCommande['codePro'])->first();
        if($produit->qte - $ligneCommande['quantite']>=0){
            $ligne->disponible  = 1;
            $ligne->idCommande = $idCommande;
            $ligne->codePro = $ligneCommande['codePro'];
            $ligne->quantite = $ligneCommande['quantite'];
            $ligne->taille = $ligneCommande['taille'];
            $ligne->couleur = $ligneCommande['couleur'];
            $produit->qte -= $ligneCommande['quantite'];

            $formatedData['codePro'] = $ligneCommande['codePro'];
            $formatedData['qte'] = $ligneCommande['quantite'];
            $formatedData['dateStock'] = now();
            $formatedData['operation'] = 0;
            // Crée une nouvelle requête pour valider les données de gestion de stock
            $storeRequest = new StoreGestionStockRequest();
            $storeRequest->replace($formatedData);

            // Utilise le contrôleur GestionStock pour enregistrer les données validées
            $gestionStockController = new GestionStockController();
            if ($gestionStockController->store($storeRequest)){
                $produit->save();
                $ligne->save();
                return '';
            }
        }else{
            $ligne->disponible  = 0;
            return 'Stock insuffisant : il ne reste que '.$produit->qte.' exemplaire(s) restant(s) pour le produit '.$produit->nomPro.'.\n';
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($idCommande)
    {   
        $lignesCommande = LigneCommande::where('idCommande',$idCommande)->get();
        // return LigneCommandeResource::collection($lignesCommande, 200);
        return $lignesCommande;
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
