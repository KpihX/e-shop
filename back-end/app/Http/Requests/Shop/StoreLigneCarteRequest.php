<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class StoreLigneCarteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Ensure the user is authenticated
    }

    public function rules(): array
    {
        return [
            'idFac' => 'required|integer|exists:facture,idFac',
            'idCarte' => 'required|integer|exists:client_carte,idCarte',
            'point' => 'required|integer',
            'dateOpera' => 'required|date',
            'montantFac' => 'required|numeric|min:0',
        ];
    }
}
