<?php

namespace App\Http\Controllers\Shop;

use App\Http\Resources\Shop\ProduitResource;
use App\Http\Requests\Shop\StoreProduitRequest;
use App\Http\Requests\Shop\UpdateProduitRequest;
use Illuminate\Http\Request;
use App\Models\Shop\Produit;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shop\StoreGestionStockRequest;
use App\Models\Shop\Photo;
use Exception;
use Illuminate\Support\Facades\Config;

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->query('category');
        $searchType = $request->query('searchType');
        $perPage = Config::get('pagination.perPage', 12);
        $page = $request->query('page', 1);
        $searchItem = $request->query('searchItem');

        $query = Produit::query();

        if ($categoryId && $categoryId != -1) {
            $query->where('idCategorie', $categoryId);
        }

        if ($searchItem) {
            if ($searchType == "name") {
                $query->where('nomPro', 'like', '%' . $searchItem . '%');
            } elseif ($searchType == "id") {
                $query->where('codePro', intval($searchItem));
            }
        }

        $produits = $query->paginate($perPage, ['*'], 'page', $page);

        return ProduitResource::collection($produits);
    }

    public function store(StoreProduitRequest $request)
    {
        $validatedData = $request->validated();
        $productData = $validatedData['convertedFormData'];
        $codePro = str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
        $productData['codePro'] = $codePro;
        $product = new ProduitResource(Produit::create($productData));
        $formatedData1 = [
            'codePro' => $codePro,
            'idGest' => $validatedData['idGest'],
            'qte' => $product->qte,
            'dateStock' => now(),
            'operation' => 3
        ];
        $storeRequest1 = new StoreGestionStockRequest();
        $storeRequest1->replace($formatedData1);
            // Utilise le contrôleur GestionStock pour enregistrer les données validées
        $gestionStockController = new GestionStockController();
        $gestionStockController->store($storeRequest1);
        return $product;
    }

    public function update(UpdateProduitRequest $request, $codePro)
    {
        $validatedData = $request->validated();
        $productData = $validatedData['convertedFormData'];
        $product = Produit::findOrFail($codePro);
        $productQte = $product->qte;
        error_log($productQte);
        $product->update($productData);
        error_log($product->qte);
        $productQte = $productData['qte'] - $productQte;
        $formatedData = [
            'codePro' => $codePro,
            'idGest' => $validatedData['idGest'],
            'qte' => 0,
            'dateStock' => now(),
            'operation' => 0
        ];
        if($productData == 0){
            return new ProduitResource($codePro);
        }
        if($productQte > 0){
            $formatedData['operation'] = 3;
            $formatedData['qte'] = $productQte;

        }else{
            $formatedData['operation'] = 4;
            $formatedData['qte'] = -1*$productQte;

        }
        $storeRequest = new StoreGestionStockRequest();

        $storeRequest->replace($formatedData);
            // Utilise le contrôleur GestionStock pour enregistrer les données validées
        $gestionStockController = new GestionStockController();
        $gestionStockController->store($storeRequest);

        return new ProduitResource($codePro);
    }

    public function destroy(Request $request)
    {
        $validatedData = $request->validate([
            'codePro' => 'required',
            'idGest' => 'required|integer'
        ]);

        try {
            $product = Produit::findOrFail($request['codePro']);
            $photos = Photo::where('codePro', $request['codePro'])->get();
            foreach ($photos as $photo) {
                $photo->delete();
            }
            $formatedData1 = [
                'codePro' => $request['codePro'],
                'idGest' => $validatedData['idGest'],
                'qte' => $product->qte,
                'dateStock' => now(),
                'operation' => 5
            ];
            $product->delete();
            $storeRequest1 = new StoreGestionStockRequest();
            $storeRequest1->replace($formatedData1);
                // Utilise le contrôleur GestionStock pour enregistrer les données validées
            $gestionStockController = new GestionStockController();
            $gestionStockController->store($storeRequest1);
            return response()->json('Produit supprimé');
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
