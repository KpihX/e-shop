<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\StoreCategorieRequest;
use App\Http\Requests\Shop\UpdateCategorieRequest;
use App\Http\Resources\Shop\CategorieResource;
use App\Models\Shop\Categorie;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class CategorieController extends Controller
{
    public function index()
    {
        return CategorieResource::collection(Categorie::all());
    }

    public function store(StoreCategorieRequest $request)
    {
        $this->validateCategorie($request);

        $categorie = Categorie::create($request->validated());

        return (new CategorieResource($categorie))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $categorie = Categorie::findOrFail($id);

        return new CategorieResource($categorie);
    }

    public function update(UpdateCategorieRequest $request, $id)
    {
        $categorie = Categorie::findOrFail($id);

        $this->validateCategorie($request, $categorie);

        $categorie->update($request->validated());

        return new CategorieResource($categorie);
    }

    public function destroy($id)
    {
        $categorie = Categorie::findOrFail($id);

        $categorie->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    private function validateCategorie($request, $categorie = null)
    {
        $existingCategorie = Categorie::where('nomCat', $request->nomCat)
            ->when($categorie, function ($query) use ($categorie) {
                $query->where('idCat', '!=', $categorie->id);
            })
            ->first();

        if ($existingCategorie) {
            throw new \Exception('La catégorie existe déjà.', Response::HTTP_CONFLICT);
        }
    }
}

