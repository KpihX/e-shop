<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shop\Categorie;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categorie::create(['nomCat' => 'Bébé']);
        Categorie::create(['nomCat' => 'Enfant']);
        Categorie::create(['nomCat' => 'Homme']);
        Categorie::create(['nomCat' => 'Femme']);
    }
}


