<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCommandeRequest extends FormRequest
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
            'convertedFormData.dateCom' => 'required|date',
            'convertedFormData.montant' => 'required|numeric',
            'convertedFormData.nomClient' => 'required|string',
            'convertedFormData.mobile' => 'required|string',
            'convertedFormData.adresse' => 'required|string',
            'convertedFormData.commentaire' => 'nullable|string',
            'convertedFormData.livrer' => 'required|in:0,1',
            'convertedFormData.avance' => 'nullable|numeric',
            'convertedFormData.remise' => 'nullable|numeric',
            'convertedFormData.type' => 'in:0,1',
            'convertedFormData.idVille' => 'required',
            'gest' => 'sometimes',
            //
        ];
    }
}
