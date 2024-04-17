<?php

namespace App\Http\Requests\shop;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommandeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client.nomClient' => 'required|string',
            'client.mobile' => 'required|string',
            'client.adresse' => 'required|string',
            'client.idVille' => 'required|integer',
            'produits' => 'required|array',
            'produits.*.codePro' => 'required|integer', // Valide chaque élément de l'array produits
            'produits.*.quantite' => 'required|integer',
            'produits.*.taille' => 'required|string',
            'produits.*.couleur' => 'required|string',
            'montant' => 'required|numeric',
        ];
    }
}
