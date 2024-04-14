<?php


namespace App\Http\Resources\Shop;

use Illuminate\Http\Resources\Json\JsonResource;

// use App\Models\Shop\Photo;

class ProduitResource extends JsonResource
{
    public function toArray($request)
    {
        // Récupérer une image aléatoire pour le produit
        $photo = $this->photos()->inRandomOrder()->first();

        return [
            'codePro' => $this->codePro,
            'idCategorie' => $this->idCategorie,
            'nomPro' => $this->nomPro,
            'prix' => $this->prix,
            'qte' => $this->qte,
            'description' => $this->description,
            // 'codeArrivage' => $this->codeArrivage,
            // 'actif' => $this->actif,
            // 'dateInsertion' => $this->dateInsertion->format('Y-m-d'),
            // 'prixAchat' => $this->prixAchat,
            // 'pourcentage' => $this->pourcentage,
            'promo' => $this->promo,
            'size1' => $this->size1,
            'size2' => $this->size2,
            // 'typeSize' => $this->typeSize,
            'image' => $photo ? $photo->lienPhoto : null, // Lien vers une image aléatoire du produit
        ];
    }
}
