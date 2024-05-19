<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LigneCarteResource extends JsonResource
{
    public function toArray($request): array
    {
        /**
         * We can optionaly return a ligneCarte with the clientcarte and facture objects
         * 
         */
        return [
            'id' => $this->id,
            'idFac' => $this->idFac,
            'idCarte' => $this->idCarte,
            'point' => $this->point,
            'dateOpera' => $this->dateOpera,
            'montantFac' => $this->montantFac,
            // Optional returns
            'clientCarte' => new ClientCarteResource($this->whenLoaded('clientCarte')),
            'facture' => new FactureResource($this->whenLoaded('facture')),
        ];
    }
}
