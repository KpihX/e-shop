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
use Illuminate\Support\Facades\Config;

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->query('category');
        $searchType = $request->query('searchType');
        $perPage = Config::get('pagination.perPage', 9);
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
        $product = $validatedData['convertedFormData'];

        $codePro = Produit::create($product);

        return new ProduitResource($codePro);
    }

    public function update(UpdateProduitRequest $request, $codePro)
    {
        $validatedData = $request->validated();
        $product = $validatedData['convertedFormData'];

        Produit::findOrFail($codePro)->update($product);

        return new ProduitResource($codePro);
    }

    public function destroy($codePro)
    {
        try {
            $product = Produit::findOrFail($codePro);
            $photos = Photo::where('codePro', $codePro)->get();
            foreach ($photos as $photo) {
                $photo->delete();
            }
            $product->delete();

            return response()->json('Produit supprimé');
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
