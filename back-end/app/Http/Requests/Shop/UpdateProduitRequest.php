<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProduitRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'convertedFormData.idCategorie' => 'required|exists:categorie,idCat',
            'convertedFormData.nomPro' => 'required|string|max:255',
            'convertedFormData.prix' => 'required|numeric',
            'convertedFormData.qte' => 'required|integer|min:0',
            'convertedFormData.description' => 'nullable|string',
            'convertedFormData.codeArrivage' => 'nullable|string',
            'convertedFormData.actif' => 'required|in:0,1',
            'convertedFormData.dateInsertion' => 'required|date',
            'convertedFormData.prixAchat' => 'required|numeric',
            'convertedFormData.pourcentage' => 'nullable|numeric|between:0,99.99',
            'convertedFormData.promo' => 'nullable|in:0,1',
            'convertedFormData.size1' => 'required|string',
            'convertedFormData.size2' => 'required|string',
            'convertedFormData.typeSize' => 'sometimes|integer',
        ];
    }
}