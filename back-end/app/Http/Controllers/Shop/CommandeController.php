<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shop\StoreCommandeRequest;
use App\Http\Resources\Shop\CommandeResource;
use App\Models\Shop\Commande;
use App\Models\Shop\Produit;
use App\Models\Shop\LigneCommande;
use App\Http\Controllers\Shop\LigneCommandeController;
use App\Http\Requests\Shop\UpdateCommandeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Shop\FactureController;

// use DB;

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
        // Check if there are any commandes
        if ($commandes) {
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
    public function store(StoreCommandeRequest $request)
    {
        // Check if the request is valid
        $validatedData = $request->validated();
        if (!$validatedData) {
            return response()->json('Please fill all the fields', 400);
        }

        // Fetch datas
        $produits = $validatedData['produits'];
        $client = $validatedData['client'];
        $montant = $validatedData['montant'];
        print_r($montant);
        $report = '';

        // Create a new command
        try {
            $commande = new Commande();
            $commande->idVille = $client['idVille'];
            $commande->nomClient = $client['nomClient'];
            $commande->mobile = $client['mobile'];
            $commande->adresse = $client['adresse'];
            $commande->montant = $montant;
            $commande->dateCom = now();
            $commande->livrer = 0;
            $commande->avance = 0;
            $commande->type = 0;
            $commande->remise = 0;
            $commande->save();

            // Create a new ligne de commande for each produit in the request
            foreach ($produits as $ligneCommande) {
                $controller = new LigneCommandeController();
                $report .= $controller->store($ligneCommande, $commande->idCommande);
            }

            $id = $commande->idCommande;
            if (LigneCommande::where('idCommande', $id)->count() == 0) {
                $commande->delete();
                return response()->json('Impossible to create an empty command', 201);
            } else {
                // Return a success message
                return response()->json('Command created .\n' . $report, 201);
            }
        } catch (\Exception $e) {
            // Return an error message
            error_log($e->getMessage());
            return response()->json($e->getMessage(), 400);
        }
    }

    /**
     * Get all unchecked commands
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getUncheckedCommand(Request $request)
    {
        $commande = Commande::where('livrer', 0)->get();

        // If there are no unchecked commands return an error message
        if ($commande->count() == 0) {
            return response()->json('Pas de Commande non livrée', 400);
        }

        // Otherwise return all the unchecked commands
        return CommandeResource::collection($commande, 200);
    }


    public function getUserCommands(Request $request){
        $data = Validator::make($request->all(), [
            'nomClient' => 'required|string|max:255',
        ]);
        if ($data->fails()) {
            return response()->json('Commande Inexistante', 400);
        }
        $commande = Commande::where('nomClient', $request->nomClient)->get();
        return CommandeResource::collection($commande, 200);
    }
    public function checkCommand(Request $request){
        $data = Validator::make($request->all(), [
            'idCommande' => 'required|integer',
        ]);
        if ($data->fails()) {
            return response()->json('Commande Inexistante', 400);
        }
        $commande = Commande::where('idCommande', $request->idCommande)->first();
        $commande->livrer = 1;
        $commande->save();
        return response()->json('Commande Livrée', 200);
    }

    public function updateCommand(UpdateCommandeRequest $request, $idCommande)
    {

        $validatedData = $request->validated();
        $data = $validatedData['convertedFormData'];
        $gest = $validatedData['gest'];
        // $commande = Commande::where('idCommande', $validatedData['idCommande'])->first();
        $commande = Commande::findOrFail($idCommande);

        try {
            DB::transaction(function () use ($commande, $gest, $data) {
                if ($commande->livrer == 0){
                    $commande->update($data);
                    if($commande->livrer == 1){
                        $controller = new FactureController();
                        $controller->convertCommandeToFacture($commande->idCommande, $data, $gest);
                        return response()->json('Commande Updated', 200);
                    }
                }
                $commande->update($data);
            });
            return response()->json('Commande Updated', 200);
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return response()->json(['error' => 'Une erreur est survenue lors de la mise à jour de la commande.', 'message' => $e->getMessage()], 500);
        }
        return response()->json('Commande Updated', 200);
        // On ne va pas se tuer!!!!!!!!!!!!!!!!!!!!!
    }

    public function getCommand(Request $request){
        $data = Validator::make($request->all(), [
            'idCommande' => 'required|integer',
        ]);
        if ($data->fails()) {
            return response()->json('Commande Inexistante', 400);
        }
        $controller = new LigneCommandeController();
        return $controller->show($request->idCommande);
    }
    /**
     * Destroy a command and all its lines
     *
     * @param int $idCommande The id of the command to destroy
     * @return void
     */
    public function destroy($idCommande){
        error_log("Commande $idCommande");
        $lignesCommande = LigneCommande::where('idCommande', $idCommande)->get();
        /** @var LigneCommande $ligne */
        foreach ($lignesCommande as $ligne) {
            $produit = Produit::where('codePro', $ligne->codePro)->first();
            $produit->qte += $ligne->quantite;
            $produit->save();
            $ligne->delete();
        }
        $commande = Commande::where('idCommande', $idCommande)->first();
        $commande->delete();
        return response()->json('Commande Supprimée', 200);

    }

}
