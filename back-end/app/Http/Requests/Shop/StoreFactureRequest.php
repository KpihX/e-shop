<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class StoreFactureRequest extends FormRequest
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
            // Validation rules for Facture
            'dateFac' => 'required|date',
            'remise' => 'required|numeric',
            'montant' => 'required|numeric',
            'tel' => 'required|string|max:255',
            'typeFac' => 'required|integer',
            'idCaissiere' => 'required|integer',
            'capital' => 'required|numeric',
            'tva' => 'required|numeric',

            // Validation rules for LigneFacture
            'lignes.*.codePro' => 'required|integer',
            'lignes.*.prix' => 'required|numeric',
            'lignes.*.qte' => 'required|integer',
        ];
    }
}
