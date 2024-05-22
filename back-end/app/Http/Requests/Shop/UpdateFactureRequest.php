<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFactureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Validation rules for updating Facture
            'dateFac' => 'sometimes|date',
            'remise' => 'sometimes|numeric',
            'montant' => 'sometimes|numeric',
            'tel' => 'sometimes|string|max:255',
            'typeFac' => 'sometimes|integer',
            'idCaissiere' => 'sometimes|integer',
            'capital' => 'sometimes|numeric',
            'tva' => 'sometimes|numeric',

            // Validation rules for updating LigneFacture
            'lignes.*.idLFac' => 'sometimes|integer|exists:lignefacture,idLFac',
            'lignes.*.codePro' => 'sometimes|integer',
            'lignes.*.prix' => 'sometimes|numeric',
            'lignes.*.qte' => 'sometimes|integer',
        ];
    }
}
