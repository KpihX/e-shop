<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchProductRequest;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\ProduitResource;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use app\Models\Produit;

class HomeController extends Controller
{
    //
    public function getAllCategory(Request $request){
        $categories = Categorie::all();
        return CategorieResource::collection($categories);
    }



    public function getMoreProducts(Request $request){

        $categoryId = $request->get("category_id");
        $validator = Validator::make( [
            'category_id'=> $categoryId,
            ], [
            'category_id'=>'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(),400);
        }
        
        $products = Produit::where('idCat',$categoryId)->paginate(
            $perPage=10, $column=['*'], $pageName='cat_'.$categoryId
        );
        return ProduitResource::collection($products);
    }

    


    public function getMoreCategories(Request $request)

    {

        $categoriesWithProducts = [];

        $categories = Categorie::paginate(

            $perPage = 5,

            $column = ['*'],

            $pageName = 'categories'

        );

 

        foreach ($categories as $category) {

           $categoriesWithProducts[$category->idCat] = ProduitResource::collection(

                Produit::where('idCat', $category->idCat)->paginate(

                    $perPage = 10,

                    $column = ['*'],

                    $pageName = 'cat_' . $category->idCat

                )

            );

        }

 

        return $categoriesWithProducts;

    }






//     public function toArray(Request $request): array
// {
//     $produits = $this->produits()->take(10)->get();
    
//     $additionalProduits = $this->produits()->skip(10)->take(5)->get();
    
//     $allProduits = $produits->concat($additionalProduits);

//     return [
//         'idCat' => $this->idCat,
//         'produits' => ProduitResource::collection($allProduits),
//     ];
// }


    public function searchProduct(SearchProductRequest $searchProductRequest){

        // Récupérez les valeurs 'name' et 'category_id' de la requête
        $data = $searchProductRequest->validated();
        
        $products = Produit::where('idCat', $data['category_id'])->where('name', 'like', '%'.$data['name'].'%')->get();

        return ProduitResource::collection($products);

    }
    
    
}
