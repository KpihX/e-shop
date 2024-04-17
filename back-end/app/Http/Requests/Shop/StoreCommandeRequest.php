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
            'client' => 'required',
            // //infos client
            // 'client' => 'required|json',
            // //infos montant
            // 'montant' => 'required|double',
            // //infos produits
            // 'produits' => 'required|json',

            //
        ];
    }
}
