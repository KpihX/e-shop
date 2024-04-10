<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduitRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'idCategorie' => 'required|exists:categories,idCat',
            'nomPro' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'qte' => 'required|integer|min:0',
            'description' => 'required|string',
            'codeArrivage' => 'required|string|max:255',
            'actif' => 'required|boolean',
            'dateInsertion' => 'required|date',
            'prixAchat' => 'required|numeric',
            'pourcentage' => 'required|numeric|between:0,99.99',
            'promo' => 'required|boolean',
            'size1' => 'required|integer',
            'size2' => 'required|integer',
            'typeSize' => 'required|integer',
        ];
    }
}