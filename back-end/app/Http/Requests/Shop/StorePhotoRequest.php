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
            'photos.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'codePro' => 'required|exists:produits,codePro',
        ];
    }
}
