<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GestionnaireResource extends JsonResource
{
    public static $wrap = false;

    
    public function toArray(Request $request): array
    {
        return[
            'idGest' => $this->idGest,
            'nomGest' => $this->nomGest,
            'typeGest' => $this->typeGest,
            'login' => $this->login,
            'pwd' => $this->pwd,
            'actif' => $this->actif,
            'mobile' => $this->mobile,
        ];
    }
}
