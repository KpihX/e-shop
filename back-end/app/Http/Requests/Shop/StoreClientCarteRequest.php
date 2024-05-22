<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientCarteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'sexe' => 'required|integer|in:0,1',
            'dateNaiss' => 'required|string|max:255',
            'idVille' => 'required|integer|exists:villes,idVille',
            'mobile' => 'required|string|max:255',
            'whatsapp' => 'required|integer|in:0,1',
            'creation' => 'required|date',
            'point' => 'required|integer',
            'montantTontine' => 'required|numeric|min:0',
        ];
    }
}
