<?php

namespace App\Http\Resources\Shop;

use Illuminate\Http\Resources\Json\JsonResource;

class PhotoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idPhoto' => $this->idPhoto,
            'lienPhoto' => $this->lienPhoto,
            'codePro' => $this->codePro,
        ];
    }
}
