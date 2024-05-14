<?php

namespace App\Http\Controllers;

use App\Models\Gestionnaire;
use App\Http\Requests\StoreGestionnaireRequest;
use App\Http\Requests\UpdateGestionnaireRequest;
use App\Http\Resources\GestionnaireResource;

class GestionnaireController extends Controller
{
    public function index()
    {
        return GestionnaireResource::collection(
            Gestionnaire::query()->orderBy('idGest', 'asc')->get()
        );
    }

    public function store(StoreGestionnaireRequest $request)
    {
        $data = $request->validated();

        $gestionnaire = Gestionnaire::create([
            'nomGest' => $data['nomGest'],
            'typeGest' => $data['typeGest'],
            'pwd' => bcrypt($data['pwd']),
            'actif' => $data['actif'],
            'mobile' => $data['mobile'],
            'login' => ''
        ]);

        // Determine the prefix based on typeGest
        $prefix = '';
        switch ($gestionnaire->typeGest) {
            case 0:
                $prefix = 'ADMIN';
                break;
            case 1:
                $prefix = 'GEST';
                break;
            case 2:
                $prefix = 'CAIS';
                break;
        }

        // Generate the login and update the gestionnaire
        $gestionnaire->login = $prefix . $gestionnaire->idGest;
        $token = $gestionnaire->createToken('main')->plainTextToken;
        $gestionnaire->save();

        return response()->json([
            'gestionnaire' => $gestionnaire,
            'token' => $token
        ]);
    }
    
    /**
     * Affiche un gestionnaire spécifique.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $gestionnaire = Gestionnaire::find($id);

        if ($gestionnaire) {
            return response()->json($gestionnaire);
        } else {
            return response()->json(['message' => 'Gestionnaire non trouvé'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGestionnaireRequest $request, Gestionnaire $gestionnaire)
    {
        $data = $request->validated();
        print_r($data);
        if(isset($data['pwd'])){
            $data['pwd'] = bcrypt($data['pwd']);
        }
        print_r($data);
        $gestionnaire->update($data);
        return new GestionnaireResource($gestionnaire);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gestionnaire $gestionnaire)
    {
        $gestionnaire->delete();

        return response('Le gestionnaire ' . $gestionnaire->nomGest . ' a bien été supprimé!',204);
    }
}