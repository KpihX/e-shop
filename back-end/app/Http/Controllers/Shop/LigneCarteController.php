<?php

namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Requests\Shop\StoreLigneCarteRequest;
use App\Http\Requests\Shop\UpdateLigneCarteRequest;
use App\Http\Resources\Shop\LigneCarteResource;
use App\Http\Controllers\Controller;
use App\Models\Shop\LigneCarte;

class LigneCarteController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->config('pagination.perPageAdmin', 20);
        $ligneCartes = LigneCarte::latest()->paginate($perPage, ['*'], 'page', $page);
        return LigneCarteResource::collection($ligneCartes);
    }

    public function store(StoreLigneCarteRequest $request)
    {
        $ligneCarte = LigneCarte::create($request->validated());
        return new LigneCarteResource($ligneCarte);
    }

    public function show($id)
    {
        $ligneCarte = LigneCarte::findOrFail($id);
        return new LigneCarteResource($ligneCarte);
    }

    public function update(UpdateLigneCarteRequest $request, $id)
    {
        $ligneCarte = LigneCarte::findOrFail($id);
        $ligneCarte->update($request->validated());
        return new LigneCarteResource($ligneCarte);
    }

    public function destroy($id)
    {
        $ligneCarte = LigneCarte::findOrFail($id);
        $ligneCarte->delete();
        return response()->json(['message' => 'La LigneCarte à été bien détruite.'], 200);
    }

    
}
