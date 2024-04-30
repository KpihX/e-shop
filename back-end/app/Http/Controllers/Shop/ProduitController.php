<?php

namespace App\Http\Controllers\Shop;

use App\Http\Resources\Shop\ProduitResource;
use App\Http\Requests\Shop\StoreProduitRequest;
use App\Http\Requests\Shop\UpdateProduitRequest;
use Illuminate\Http\Request;
use App\Models\Shop\Produit;
use App\Http\Controllers\Controller;
use App\Models\Shop\Photo;
use Exception;
use Illuminate\Http\Testing\File;
use Illuminate\Support\Facades\Storage;
use Psy\Readline\Hoa\FileException;
use Illuminate\Http\Response;


// Définition de la classe ProduitController

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        // Récupérez l'identifiant de la catégorie à partir de la requête, s'il est présent
        $categoryId = $request->query('category');
        
    
        // Assurez-vous que la requête contient 'page'
        $page = $request->query('page', 1);

        $searchItem = $request->query('searchItem');
        // error_log("searchItem = " . $searchItem);
    
        // Créez une requête de base pour les produits
        $query = Produit::query();
    
        // Si un identifiant de catégorie est fourni, filtrez les produits par cette catégorie
        if ($categoryId && $categoryId != -1) {
            $query->where('idCategorie', $categoryId);
        }

        if ($searchItem) {
            $query->where('nomPro', 'like', '%' . $searchItem . '%');
        }
    
        // Paginez les produits, 10 par page
        $produits = $query->paginate(12, ['*'], 'page', $page);
    
        return ProduitResource::collection($produits);
    }

    // public function search (Request $request) {
    //     $searchItem = $request->query('searchItem');

    //     $categoryId = $request->query('category');

    //     $query = Produit::query();

    //     if ($categoryId && $categoryId != -1) {
    //         $query->where('idCategorie', $categoryId);
    //     }

    //     if ($searchItem) {
    //         $query->where('nomPro', 'like', '%' . $searchItem . '%');
    //     }

    //     $products = $query->paginate(10);

    //     return ProduitResource::collection($products);
    // }

    /**
     * Enregistre un nouveau produit
     * 
     * @param StoreProduitRequest $request contient les données du produit à enregistrer
     * @return ProduitResource le produit enregistré
     */
    public function store (StoreProduitRequest $request){

        // Vérifie si les données sont correctes
        if(!$request->validated()){
            return response()->json("Impossible d'enregistrer ce produit", 400);
        }

        // Crée un nouvel objet Produit
        $product=new Produit();
        $photo = new Photo();

        // Renseigne les propriétés de l'objet Produit avec les données de la requête
        $product->fill([
            'nomProd' => $request->nomProd,
            'prix' => $request->prix,
            'codePro' => $request->codePro,
            'idCategorie' => $request->idCategorie,
            'qte' => $request->qte,
            'description' => $request->description,
            'codeArrivage' => $request->codeArrivage,
            'actif' => $request->actif,
            'dateInsertion' => $request->dateInsertion,
            'prixAchat' => $request->prixAchat,
            'pourcentage' => $request->pourcentage,
            'promo' => $request->promo,
            'size1' => $request->size1,
            'size2' => $request->size2,
            'typeSize' => $request->typeSize,
        ]);

        // Vérifie si une image est associée au produit
        if($request->hasFile('image')){
            
            // Supprime l'ancienne image si elle existe
            $path = 'storage/'.$request->image;
            if(File::exists($path)){
                File::delete($path);
            }

            // Récupère l'image de la requête et la sauvegarde dans le dossier storage/
            $file = $request->file('image');
            $ext = $file->getClientOriginalExtension();
            $filename = time().'.'.$ext;
            try{
                $file->move('storage/', $filename);
            }catch(FileException $e){
                return response()->json($e,500);
            }
        }

        // Renseigne les propriétés de l'objet Photo
        $photo->lienPhoto = Storage::url($filename);
        $photo->codePro = $product->codePro;

        // Sauvegarde l'objet Produit et l'objet Photo
        if($product->save() && $photo->save()){
            return new ProduitResource($product);
        }else return response()->json("Impossible d'enregistrer ce produit", 400);
        
    }
    /**
     * Mise à jour d'un produit
     *
     * @param UpdateProduitRequest $request contient les données du produit à modifier
     * @param int $codePro code du produit à modifier
     *
     * @return \Illuminate\Http\JsonResponse message de confirmation de la modification
     */
    public function update(UpdateProduitRequest $request, $codePro){
        // Vérifie si les données sont correctes
        if(!$request->validated()){
            return response()->json("Impossible d'enregistrer ce produit", 400);
        }
        // Crée un nouvel objet Photo
        $photo = new Photo();
        // Récupère le produit à modifier
        $product = Produit::find($codePro);
        // Vérifie si le produit existe
        if($product){
            // Renseigne les propriétés de l'objet Produit avec les données de la requête
            $product->fill([
                'nomProd' => $request->nomProd,
                'prix' => $request->prix,
                'idCategorie' => $request->idCategorie,
                'qte' => $request->qte,
                'description' => $request->description,
                'codeArrivage' => $request->codeArrivage,
                'actif' => $request->actif,
                'dateInsertion' => $request->dateInsertion,
                'prixAchat' => $request->prixAchat,
                'pourcentage' => $request->pourcentage,
                'promo' => $request->promo,
                'size1' => $request->size1,
                'size2' => $request->size2,
                'typeSize' => $request->typeSize,
            ]);
            // Vérifie si une image est associée au produit
            if($request->hasFile('image')){
                // Supprime l'ancienne image si elle existe
                $path = 'storage/'.$request->image;
                if(File::exists($path)){
                    File::delete($path);
                }
                // Récupère l'image de la requête et la sauvegarde dans le dossier storage/
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time().'.'.$ext;
                try{
                    $file->move('storage/', $filename);
                }catch(FileException $e){
                    return response()->json($e,500);
                }
            }
            // Renseigne les propriétés de l'objet Photo
            $photo->lienPhoto = Storage::url($filename);
            $photo->codePro = $product->codePro;
            // Sauvegarde l'objet Produit et l'objet Photo
            if($product->save() && $photo->save()){
                return response()->json('Produit modifié avec succès');
            }else return response()->json("Impossible d'enregistrer ce produit", 400);
        }else return response()->json('Produit non trouvé');
    }


    /**
     * Supprime un produit
     *
     * @param int $codePro code du produit à supprimer
     *
     * @return \Illuminate\Http\JsonResponse message de confirmation de la suppression
     */
    public function destroy($codePro)
    {
        try {
            $product = Produit::find($codePro);
            if ($product) {
                $product->delete();
                return response()->json('Produit Supprimé');
            } else {
                return response()->json('Catégorie non trouvée');
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

}
