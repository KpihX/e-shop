<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;
use App\Http\Resources\ProduitResource;
use App\Models\Photo;
use App\Models\Produit;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Psy\Readline\Hoa\FileException;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Produit::paginate(10);
        // Retourner les données en format JSON
        if($products){
            return ProduitResource::collection($products);
        }else return response()->json("Pas de Produit");
    }

    public function show($codePro){
        
        $product = Produit::find($codePro);
        if($product){
            return new ProduitResource($product);
        }else return response()->json("Produit non trouvé");
    }
    public function store (StoreProduitRequest $request){

        if(!$request->validated()){
            return response()->json("Impossible d'enregistrer ce produit", 400);
        }
        $product=new Produit();
        $photo = new Photo();
        $product->fill([
            'nomProd' => $request->nomProd,
            'prix' => $request->prix,
            'codeCat' => $request->codeCat,
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
        if($request->hasFile('image')){
            $path = 'storage/'.$request->image;
            if(File::exists($path)){
                File::delete($path);
            }
            $file = $request->file('image');
            $ext = $file->getClientOriginalExtension();
            $filename = time().'.'.$ext;
            try{
                $file->move('storage/', $filename);
            }catch(FileException $e){
                return response()->json($e,500);
            }
        }
        $photo->lienPhoto = Storage::url($filename);
        $photo->codePro = $product->codePro;
        if($product->save() && $photo->save()){
            return new ProduitResource($product);
        }else return response()->json("Impossible d'enregistrer ce produit", 400);
        
    }
    public function update(){
        
    }
}   
 