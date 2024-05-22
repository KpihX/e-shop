<?php

namespace App\Http\Resources\Shop;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FactureResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idFac' => $this->idFac,
            'dateFac' => $this->dateFac,
            'remise' => $this->remise,
            'montant' => $this->montant,
            'tel' => $this->tel,
            'typeFac' => $this->typeFac,
            'idCaissiere' => $this->idCaissiere,
            'capital' => $this->capital,
            'tva' => $this->tva,
            // Include the LigneFactures relationship using LigneFactureResource collection
            'lignesFactures' => LigneFactureResource::collection($this->whenLoaded('lignesFactures')),
        ];
    }
}
