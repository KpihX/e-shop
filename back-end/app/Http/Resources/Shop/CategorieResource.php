<?php

namespace App\Http\Resources\Shop;

use Illuminate\Http\Resources\Json\JsonResource;

class CategorieResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idCat' => $this->idCat,
            'nomCat' => $this->nomCat,
        ];
    }
    
}
