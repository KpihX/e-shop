<?php

namespace Database\Factories\Shop;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Shop\Produit;

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
            'idCategorie' => $this->faker->numberBetween(1, 4),
            'nomPro' => $this->faker->word,
            'prix' => $this->faker->randomFloat(2, 10, 100),
            'qte' => $this->faker->numberBetween(1, 100),
            'description' => $this->faker->text,
            'codeArrivage' => $this->faker->unique()->word,
            'actif' => $this->faker->numberBetween(1, 7),
            'dateInsertion' => $this->faker->date,
            'prixAchat' => $this->faker->randomFloat(2, 10, 100),
            'pourcentage' => $this->faker->randomFloat(2, 0, 1),
            'promo' => $this->faker->boolean,
            'size1' => $this->faker->randomElement($sizes),
            'size2' => $this->faker->randomElement($sizes),
            'typeSize' => $this->faker->numberBetween($min = 1, $max = 100)
        ];
    }
}
