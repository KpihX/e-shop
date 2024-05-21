<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientCarteRequest;
use App\Http\Requests\UpdateClientCarteRequest;
use App\Http\Resources\ClientCarteResource;
use App\Models\ClientCarte;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class ClientCarteController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = config('pagination.perPageAdmin', 20);

        $perPage = config('pagination.perAdminpage', 20);
        $clients = ClientCarte::latest()->paginate($perPage, ['*'], 'page', $page);
        return ClientCarteResource::collection($clients);
    }

    public function store(StoreClientCarteRequest $request)
    {
        $clientCarte = ClientCarte::create($request->validated());
        return new ClientCarteResource($clientCarte);
    }

    public function show($id)
    {
        $clientCarte = ClientCarte::with('lignesCarte')->findOrFail($id);
        return new ClientCarteResource($clientCarte);
    }

    public function update(UpdateClientCarteRequest $request, $id)
    {
        $clientCarte = ClientCarte::findOrFail($id);
        $clientCarte->update($request->validated());
        return new ClientCarteResource($clientCarte);
    }

    /**
     * Destroy a CarteClient with all its LigneCarte
     */
    public function destroy($id)
    {
        DB::transaction(function () use ($id) {
            $clientCarte = ClientCarte::findOrFail($id);
            $clientCarte->ligneCartes()->delete();
            $clientCarte->delete();
        });
        return response()->json(['message' => 'ClientCarte deleted successfully.'], 200);
    }
    /**
     * Search a client carte by his phone number
     */
    public function searchByPhone(string $phone)
    {
        $query = ClientCarte::query()->where;

        if (!empty($phone)) {
            $query->where('mobile', 'like', "%{$phone}%");
        } else {
            return response()->json(['message' => 'Le mobile est vide!'], 404);
        }

        $clients = $query->with('ligneCartes');
        return ClientCarteResource::collection($clients);
    }
}
