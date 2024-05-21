<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientCarteRequest extends FormRequest
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
            'nom' => 'sometimes|required|string|max:255',
            'sexe' => 'sometimes|required|integer|in:0,1',
            'dateNaiss' => 'sometimes|required|string|max:255',
            'idVille' => 'sometimes|required|integer|exists:villes,idVille',
            'mobile' => 'sometimes|required|string|max:255',
            'whatsapp' => 'sometimes|required|integer|in:0,1',
            'creation' => 'sometimes|required|date',
            'point' => 'sometimes|required|integer',
            'montantTontine' => 'sometimes|required|numeric|min:0',
        ];
    }
}
