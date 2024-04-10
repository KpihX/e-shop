<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Produit;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ProduitFactory extends Factory
{
    protected $model = Produit::class;

    public function definition()
    {
        return [
            'codePro' => $this->faker->randomNumber(6,true),
            'nomPro' => $this->faker->word(),
            'prix' => $this->faker->randomFloat(0,0,100),
            'qte' => $this->faker->randomNumber(2, true),
            'description' => $this->faker->text(),
            'codeArrivage' => $this->faker->word(),
            'actif' => $this->faker->randomElement([0, 1]),
            'idCategorie' => Categorie::inRandomOrder()->first()->idCat,
            'dateInsertion' => Carbon::now(),
            'prixAchat' => $this->faker->randomFloat(0,0,100),
            'pourcentage' => $this->faker->randomFloat(0,0,0),
            'promo' => $this->faker->randomElement([0, 1]),
            'size1' => $this->faker->randomNumber(),
            'size2' => $this->faker->randomNumber(),
            'typeSize' => $this->faker->randomNumber(),
        ];
    }
}
