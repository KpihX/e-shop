<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLigneCarteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Ensure the user is authenticated
    }

    public function rules(): array
    {
        return [
            'idFac' => 'sometimes|required|integer|exists:facture,idFac',
            'idCarte' => 'sometimes|required|integer|exists:client_carte,idCarte',
            'point' => 'sometimes|required|integer',
            'dateOpera' => 'sometimes|required|date',
            'montantFac' => 'sometimes|required|numeric|min:0',
        ];
    }
}
