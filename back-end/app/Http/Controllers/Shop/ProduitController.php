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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File ;

// Définition de la classe ProduitController

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        // Récupérez l'identifiant de la catégorie à partir de la requête, s'il est présent
        $categoryId = $request->query('category');
        
        $searchType = $request->query('searchType');

        //On définit la pagination
        $perPage = Config::get('pagination.perPage');
    
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
            if ($searchType == "name") {
                $query->where('nomPro', 'like', '%' . $searchItem . '%');
            } else if ($searchType == "id") {
                $query->where('codePro', intval($searchItem));
            }
        }
        
        // Paginez les produits, 9 par page
        $produits = $query->paginate($perPage, ['*'], 'page', $page);
    
        return ProduitResource::collection($produits);
    }


    public function store (StoreProduitRequest $request){

        // Vérifie si les données sont correctes
        $validatedData = $request->validated();

        // Crée un nouvel objet Produit
        $product= $validatedData['convertedFormData'];

        if($file= $validatedData['image'] != null){
            $filename = $file;
            // // Supprime l'ancienne image si elle existe
            // $path = 'storage/'.$request['image'];
            // if(File::exists($path)){
            //     File::delete($path);
            // }

            // // Récupère l'image de la requête et la sauvegarde dans le dossier storage/
            // $file = $validatedData['image'];
            // try{
            // $ext = $file->getClientOriginalExtension();
            // $filename = time().'.'.$ext;
            //     error_log($filename);
            //     $file->move('storage/', $filename);
            // }catch(Exception $e){
            //     $filename = $file;
            // }
        }else{
            $filename = $request['image'];
        }
        
        // Renseigne les propriétés de l'objet Produit avec les données de la requête
        $codePro = Produit::create($product);
        $imgData = [
            'codePro' => $codePro->codePro,
            'lienPhoto' => $filename
        ];
        $photo = Photo::create($imgData);

            return new ProduitResource($codePro);
        
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
        $validatedData = $request->validated();
        
        // Crée un nouvel objet Produit
        $product= $validatedData['convertedFormData'];
        Produit::findOrFail($codePro)->update($product);

        // if($file= $validatedData['image'] != null){
        //     $filename = $file;
        //     // Supprime l'ancienne image si elle existe
        //     $path = 'storage/'.$request['image'];
        //     if(File::exists($path)){
        //         File::delete($path);
        //     }

        //     // Récupère l'image de la requête et la sauvegarde dans le dossier storage/
        //     $file = $validatedData['image'];
        //     try{
        //     $ext = $file->getClientOriginalExtension();
        //     $filename = time().'.'.$ext;
        //         error_log($filename);
        //         $file->move('storage/', $filename);
        //     }catch(Exception $e){
        //         $filename = $file;
        //     }
        //     Produit::findOrFail($codePro)->update($product);
        //     $imgData = [
        //     'codePro' => $codePro,
        //     'lienPhoto' => $filename
        //     ];
        //     Photo::create($imgData);

        // }else{
        //     // $filename = $request['image'];
        //     Produit::findOrFail($codePro)->update($product);
        // }

            return new ProduitResource($codePro);
        
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
