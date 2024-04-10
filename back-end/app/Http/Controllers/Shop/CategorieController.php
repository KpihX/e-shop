<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\StoreCategorieRequest;
use App\Http\Requests\Shop\UpdateCategorieRequest;
use App\Http\Resources\Shop\CategorieResource;
use App\Models\Shop\Categorie;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

// Contrôleur pour les catégories de produits

class CategorieController extends Controller
{
    // Afficher la liste des catégories
    public function index()
    {
        $categories = Categorie::all();
        return CategorieResource::collection($categories);
    }

    // Enregistrer une nouvelle catégorie
    public function store(StoreCategorieRequest $request)
    {
        // Vérifier si la catégorie existe déjà
        $existingCategorie = Categorie::where('nomCat', $request->nomCat)->first();
        if ($existingCategorie) {
            return response()->json(['message' => 'La catégorie existe déjà!'], Response::HTTP_CONFLICT);
        }

        $categorie = Categorie::create($request->validated());
        return (new CategorieResource($categorie))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    // Afficher une catégorie spécifique
    public function show($id)
    {
        $categorie = Categorie::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée!'], 404);
        }

        return new CategorieResource($categorie);
    }

    // Mettre à jour une catégorie
    public function update(UpdateCategorieRequest $request, $id)
    {
        $categorie = Categorie::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        // Vérifier si le nom de la catégorie est déjà utilisé par une autre catégorie
        $existingCategorie = Categorie::where('nomCat', $request->nomCat)
                                       ->where('idCat', '!=', $id)
                                       ->first();
        if ($existingCategorie) {
            return response()->json(['message' => 'Le nom de la catégorie existe déjà.'], Response::HTTP_CONFLICT);
        }

        $categorie->update($request->validated());
        return new CategorieResource($categorie);
    }

    // Supprimer une catégorie
    public function destroy($id)
    {
        $categorie = Categorie::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }


        $categorie->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
