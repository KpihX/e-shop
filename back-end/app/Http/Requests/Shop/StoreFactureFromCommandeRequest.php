<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * This request is needed before we can transform a Commande into a Facture
 */
class StoreFactureFromCommandeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'typeFac' => 'required|integer',
            'idCaissiere' => 'required|integer',
            'capital' => 'required|numeric',
            'tva' => 'required|numeric',
        ];
    }
}
