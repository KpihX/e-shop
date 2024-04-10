<?php

namespace Database\Factories\Shop;

use App\Models\Shop\Photo;
use App\Models\Shop\Produit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shop\Photo>
 */
class PhotoFactory extends Factory
{
    protected $model = Photo::class;

    public function definition()
    {
        // Tableau des chemins d'images
        $imagePaths = [
            'images/bebe/bebe_1.png',
            'images/bebe/bebe_2.png',
            'images/bebe/bebe_3.png',
            'images/bebe/bebe_4.png',
            'images/bebe/bebe_5.png',
            'images/bebe/bebe_6.png',
            'images/bebe/bebe_7.png',
            'images/bebe/bebe_8.png',
            'images/bebe/bebe_9.png',
            'images/bebe/bebe_10.png',
            'images/enfant/enfant_1.png',
            'images/enfant/enfant_2.png',
            'images/enfant/enfant_3.png',
            'images/enfant/enfant_4.png',
            'images/enfant/enfant_5.png',
            'images/enfant/enfant_6.png',
            'images/enfant/enfant_7.png',
            'images/enfant/enfant_8.png',
            'images/enfant/enfant_9.png',
            'images/enfant/enfant_10.png',
            'images/homme/homme_1.png',
            'images/homme/homme_2.png',
            'images/homme/homme_3.png',
            'images/homme/homme_4.png',
            'images/homme/homme_5.png',
            'images/homme/homme_6.png',
            'images/homme/homme_7.png',
            'images/homme/homme_8.png',
            'images/homme/homme_9.png',
            'images/homme/homme_10.png',
            'images/femme/femme_1.png',
            'images/femme/femme_2.png',
            'images/femme/femme_3.png',
            'images/femme/femme_4.png',
            'images/femme/femme_5.png',
            'images/femme/femme_6.png',
            'images/femme/femme_7.png',
            'images/femme/femme_8.png',
            'images/femme/femme_9.png',
            'images/femme/femme_10.png',
        ];
        return [
            'lienPhoto' => url('storage/' . $this->faker->randomElement($imagePaths)),
            'codePro' => function () {
                return Produit::factory()->create()->codePro;
            },
        ];
    }
}
