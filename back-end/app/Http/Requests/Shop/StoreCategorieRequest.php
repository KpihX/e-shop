<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategorieRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Change this to false if you want to use authorization logic.
    }

    public function rules()
    {
        return [
            'nomCat' => 'required|string|max:255'
        ];
    }
}
