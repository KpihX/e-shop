<?php

namespace Database\Seeders;

use App\Models\Shop\Photo;
use App\Models\Shop\Produit;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProduitPhotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer 40 produits
        Produit::factory(40)->create()->each(function ($produit) {
            // Pour chaque produit, créer une image
            Photo::factory()->create([
                'codePro' => $produit->codePro
            ]);
        });
    }
}
