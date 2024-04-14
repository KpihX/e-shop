<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class StorePhotoRequest extends FormRequest
{
    public function authorize()
    {
        // TODO: Retournez true si l'utilisateur est autorisé à effectuer cette action
        return true;
    }

    public function rules()
    {
        return [
            'lienPhoto' => 'required|url|max:255',
            'codePro' => 'required|exists:produits,codePro',
        ];
    }
}
