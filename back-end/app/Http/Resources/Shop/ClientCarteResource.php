<?php

namespace App\Http\Resources\Shop;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientCarteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idCarte' => $this->idCarte,
            'nom' => $this->nom,
            'sexe' => $this->sexe,
            'dateNaiss' => $this->dateNaiss,
            'idVille' => $this->idVille,
            'mobile' => $this->mobile,
            'whatsapp' => $this->whatsapp,
            'creation' => $this->creation,
            'point' => $this->point,
            'montantTontine' => $this->montantTontine,
            'ligneCartes' => LigneCarteResource::collection($this->whenLoaded('ligneCartes'))
        ];
    }
}
