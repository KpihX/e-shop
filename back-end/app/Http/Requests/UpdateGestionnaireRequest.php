<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateGestionnaireRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        return [
            'nomGest' => 'sometimes|string|max:255',
            'typeGest' => 'sometimes|integer',
            'pwd' => [
                'sometimes',
                'nullable',
                Password::min(8)
                ->letters()
            ],
            'actif' => 'sometimes|integer',
            'mobile' => 'sometimes|string|max:255',
        ];
    }
}
