<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\CategorieResource;
use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer toutes les catégories de la base de données
        $categories = Categorie::select('idCat', 'nomCat')->get();
    
        // Retourner les données en format JSON
        return CategorieResource::collection($categories);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategorieRequest $request)
    {
        // Valider et sauvegarder la nouvelle catégorie
        $request->validated();

        $category = new Categorie();
        $category->idCat = $request->get('category_id');
        $category->nomCat = $request->get('nom');
        $category->save();
    
        // Retourner une réponse JSON avec la catégorie créée
        return response()->json($category, 201);
    }
    
    // $categoryId = $request->get('category_id');

    // // We must not define rules 
    // $validator = Validator::make([
    //     'category_id' => $categoryId,
    // ], [
    //     'category_id' => 'required|integer',
    // ]);

    // if ($validator->fails()) {
    //     return response()->json($validator->errors(), 400);
    // }

    /**
     * returns a JSON of the specified resource.
     */
    public function show(Request $request)
    {
        $idCat = $request->get('idCat');
        $validator = Validator::make([
            'idCat' => $idCat
        ],
        [
            'idCat' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Trouver la catégorie par son idCat
        $category = Categorie::where('idCat', $idCat)->first();
    
        // Vérifier si la catégorie a été trouvée
        if ($category) {
            // Retourner les détails de la catégorie en format JSON
            return CategorieResource::make($category);
        } else {
            // Retourner une réponse d'erreur si la catégorie n'est pas trouvée
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
    }
    
    

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, $idCat)
    {   
        $request->validated();
        // Trouver la catégorie par son idCat
        $category = Categorie::find($idCat);
    
        // Vérifier si la catégorie existe
        if ($category) {
            // Mettre à jour les attributs de la catégorie avec les données de la requête
            $category->nomCat = $request->nomCat;
            // Sauvegarder les modifications
            $category->save();
    
            // Retourner une réponse JSON avec la catégorie mise à jour
            return CategorieResource::make($category);
        } else {
            // Retourner une réponse d'erreur si la catégorie n'est pas trouvée
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
    }
    

    /**
     * Remove the categorie resource from storage.
     */
    public function destroy(Request $request)
    {   
        $idCat = $request->get('idCat');        
        // Trouver la catégorie par son idCat
        $category = Categorie::find($idCat);

        // Vérifier si la catégorie existe
        if ($category) {
            // Supprimer la catégorie de la base de données
            $category->delete();

            // Retourner une réponse JSON indiquant que la suppression a été réussie
            return response()->json(['message' => 'Catégorie supprimée avec succès'], 200);
        } else {
            // Retourner une réponse d'erreur si la catégorie n'est pas trouvée
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
    }

}
