<?php

namespace Database\Factories\Shop;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Shop\Produit;
use App\Services\UtilService;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shop\Produit>
 */
class ProduitFactory extends Factory
{
    protected $model = Produit::class;

    public function definition()
    {
        $sizes = ['L', 'M', 'XL', 'XLL'];
        return [
            'prix' => $this->faker->randomFloat(0, 5000, 15000),
            'qte' => $this->faker->numberBetween(1, 1000),
            'codeArrivage' => $this->faker->unique()->word,
            'actif' => $this->faker->numberBetween(0, 1),
            'dateInsertion' => $this->faker->date,
            'prixAchat' => $this->faker->randomFloat(0, 5000, 15000),
            'pourcentage' => $this->faker->randomFloat(2, 0, 0.99),
            'promo' => $this->faker->boolean,
            'size1' => $this->faker->randomElement($sizes),
            'size2' => $this->faker->randomElement($sizes),
            'typeSize' => $this->faker->numberBetween($min = 1, $max = 100)
        ];
    }
}
