<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduitRequest extends FormRequest
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
            'nomProd' => 'required|string',
            'prix' => 'required|numeric',
            'codeCat' => 'required|string',
            'idCategorie' => 'required|integer',
            'qte' => 'required|integer',
            'description' => 'nullable|string',
            'codeArrivage' => 'required|string',
            'actif' => 'required|boolean',
            'dateInsertion' => 'required|date',
            'prixAchat' => 'required|numeric',
            'pourcentage' => 'nullable|numeric',
            'promo' => 'nullable|boolean',
            'size1' => 'nullable|string',
            'size2' => 'nullable|string',
            'typeSize' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }
}
