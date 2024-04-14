<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLigneCommandeRequest extends FormRequest
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
            'codePro'=> 'required|exists:produit,codePro',
            'qte'=> 'required|integer|min:1',
            'taille'=>'required',
            'couleur'=>'required',
            'disponible'=>'required|boolean',
            'idCommande'=>'required|exists:commandes,idCommande',
            //
        ];
    }
}
