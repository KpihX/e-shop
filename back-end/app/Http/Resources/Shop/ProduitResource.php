<?php

// namespace App\Http\Resources;

// use Illuminate\Http\Request;
// use Illuminate\Http\Resources\Json\JsonResource;

// class ProduitResource extends JsonResource
// {
//     /**
//      * Transform the resource into an array.
//      *
//      * @return array<string, mixed>
//      */
//     public function toArray(Request $request): array
//     {
//         return parent::toArray($request);
//     }
// }

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProduitResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'codePro' => $this->codePro,
            'idCategorie' => $this->idCategorie,
            'nomPro' => $this->nomPro,
            'prix' => $this->prix,
            'qte' => $this->qte,
            'description' => $this->description,
            'codeArrivage' => $this->codeArrivage,
            'actif' => $this->actif,
            'dateInsertion' => $this->dateInsertion,
            'prixAchat' => $this->prixAchat,
            'pourcentage' => $this->pourcentage,
            'promo' => $this->promo,
            'size1' => $this->size1,
            'size2' => $this->size2,
            'typeSize' => $this->typeSize,
            'images' => PhotoResource::collection($this->photos), // Assuming a relationship 'photos' exists
        ];
    }
}
