<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Resources\CategorieResource;
use Exception;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer toutes les catégories de la base de données
        $categories = Categorie::all();
    
        // Retourner les données en format JSON
        return CategorieResource::collection($categories);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
                'name' =>'required|unique:Categorie,nomCat',
            ]);
            $categorie = new Categorie();
            $categorie->name = $request->name;
            $categorie->save();
            return response()->json('Catégorie ajoute avec succes', 201);
        }catch(Exception $e){
            return response()->json($e,500);
        }
    }

    /**
     * returns a JSON of the specified resource.
     */
    public function show($idCat)
    {
        $category = Categorie::find($idCat);
        if($category){
            return CategorieResource::make($category);
        }else return response()->json('Catégorie non trouvée', 404);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idCat)
    {   
        try{
            $validated = $request->validate([
                'name' =>'required|unique:Categorie,nomCat',
            ]);
            $category = Categorie::where('idCat',$idCat)->update(['nomCat'=>$request->name]);
            return response()->json("Catégorie mise à jour avec succes", 201);
        }catch(Exception $e){
            return response()->json($e,500);
        }


    }
    

    /**
     * Remove the categorie resource from storage.
     */
    public function destroy($idCat)
    {   
        try{
            $category = Categorie::find($idCat);
            if($category){
                $category->delete();
            }else return response()->json('Catégorie non trouvée');
        }catch(Exception $e){
            return response()->json($e);
        }
    }
}
