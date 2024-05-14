<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreGestionnaireRequest extends FormRequest
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
            'nomGest' => 'sometimes|string|max:255',
            'typeGest' => 'sometimes|integer',
            'pwd' => [
                'required',
                Password::min(8)
                ->letters()
            ],
            'actif' => 'sometimes|integer',
            'mobile' => 'sometimes|string|max:255',
        ];
    }
}
