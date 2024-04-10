<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchProductRequest;
use App\Http\Resources\ProduitResource;
use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function getAllCategories()
    {
        return CategorieResource::collection(Categorie::all());
    }

    public function getMoreProducts(Request $request)
    {
        $categoryId = $request->get('category_id');

        // We must not define rules 
        $validator = Validator::make([
            'category_id' => $categoryId,
        ], [
            'category_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        // We must give a unique name to the page to avoid queries
        $products = Produit::where('idCat', $categoryId)->paginate(
            10,
            ['*'],
            'cat_' . $categoryId
        );

        return ProduitResource::collection($products);
    }

    public function getMoreCategories(Request $request)
    {
        $categoriesWithProducts = [];
        $categories = Categorie::paginate(
            5,
            ['*'],
            'categories'
        );

        foreach ($categories as $category) {
            $categoriesWithProducts[$category->idCat] = ProduitResource::collection(
                Produit::where('idCat', $category->idCat)->paginate(
                    10,
                    ['*'],
                    'cat_' . $category->idCat
                )
            );
        }

        return $categoriesWithProducts;
    }

    public function searchProducts(SearchProductRequest $request)
    {
        // $data contient "name" et "category_id"
        $data = $request->validated();

        $products = Produit::where('idCat', $data['category_id'])->where('name', 'like', '%' . $data['name'] . '%')->get();
        return ProduitResource::collection($products);
    }
}
