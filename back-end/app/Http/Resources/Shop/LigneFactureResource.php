<?php

namespace App\Http\Resources;

use App\Http\Resources\Shop\ProduitResource;
use App\Models\LigneFacture;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LigneFactureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idLFac' => $this->idLFac,
            'codePro' => $this->codePro,
            'prix' => $this->prix,
            'qte' => $this->qte,
            'produit' => [
                'codePro' => $this->produit()->codePro,
                'nomPro' => $this->produit()->nomPro,
                'idCategorie' => $this->produit()->idCategorie,
            ]
        ];
    }
}
