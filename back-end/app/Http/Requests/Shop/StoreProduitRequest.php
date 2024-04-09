<?php

// namespace App\Http\Requests;

// use Illuminate\Foundation\Http\FormRequest;

// class StoreProduitRequest extends FormRequest
// {
//     /**
//      * Determine if the user is authorized to make this request.
//      */
//     public function authorize(): bool
//     {
//         return false;
//     }

//     /**
//      * Get the validation rules that apply to the request.
//      *
//      * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
//      */
//     public function rules(): array
//     {
//         return [
//             //
//         ];
//     }
// }

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduitRequest extends FormRequest
{
    public function authorize()
    {
        return true; // TODO: Add your authorization logic here.
    }

    public function rules()
    {
        // return [
        //     'nom' => 'required|string|max:255',
        //     'description' => 'nullable|string',
        //     'prix' => 'required|numeric|min:0',
        //     'stock' => 'required|integer|min:0',
        // ];
        return [
            'idCategorie' => 'required|exists:categorie,idCat',
            'nomPro' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'qte' => 'required|integer',
            'description' => 'required|string',
            'codeArrivage' => 'required|string|max:255',
            'actif' => 'required|boolean',
            'dateInsertion' => 'required|date',
            'prixAchat' => 'required|numeric',
            'pourcentage' => 'required|numeric|between:0,1',
            'promo' => 'required|boolean',
            'size1' => 'required|integer',
            'size2' => 'required|integer',
            'typeSize' => 'required|integer',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048', // assuming images are uploaded
        ];
    }
}