<?php

namespace Database\Seeders;

use App\Models\Shop\Photo;
use App\Models\Shop\Produit;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Factories\Shop\ProduitFactory;
use App\Services\UtilService;
use Illuminate\Support\Str;

class ProduitPhotoSeeder extends Seeder
{
    protected static $productsNames = [];
    protected static $imagePaths = [];

    public static function formatImageName($string) {
        // Remplacer les espaces par des underscores
        $formatted = str_replace(' ', '_', $string);
        // Mettre la première lettre de chaque mot en majuscule
        $formatted = lcfirst($formatted);
        // Remplacer les accents
        $formatted = iconv('UTF-8', 'ASCII//TRANSLIT', $formatted);
        // Concaténer avec le chemin du dossier et l'extension du fichier
        return "images/" . Str::before($formatted, '_') . "/" . $formatted . '.png';
    }

    public static function prepareProductsNames() {
        // Tableaux des noms de produits
        $babyProductsNames = [
            'Bébé 1',
            'Bébé 2',
            'Bébé 3',
            'Bébé 4',
            'Bébé 5',
            'Bébé 6',
            'Bébé 7',
            'Bébé 8',
            'Bébé 9',
        ];

        $childProductsNames = [
            'Enfant 1',
            'Enfant 2',
            'Enfant 3',
            'Enfant 4',
            'Enfant 5',
            'Enfant 6',
            'Enfant 7',
            'Enfant 8',
            
        ];

        $manProductsNames = [
            'Homme 1',
            'Homme 2',
            'Homme 3',
            'Homme 4',
            'Homme 5',
            'Homme 6',
            'Homme 7',
            'Homme 8',
            'Homme 9',
            'Homme 10',
        ];

        $womanProductsNames = [
            'Femme 1',
            'Femme 2',
            'Femme 3',
            'Femme 4',
            'Femme 5',
            'Femme 6',
            'Femme 7',
            'Femme 8',
            'Femme 9',
        ];

        self::$productsNames = UtilService::intercalateArrays($babyProductsNames, $childProductsNames, $manProductsNames, $womanProductsNames);
    }

    public static function prepareImagePaths() {
        self::prepareProductsNames();

        foreach(self::$productsNames as $value) {
            self::$imagePaths[] = self::formatImageName($value);
        }
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        self::prepareImagePaths();
        
        $numberOfProducts = 36;
        $i = 0;
        $j = 0;
        while ($i < $numberOfProducts) {
            $product = UtilService::getAtIndex(self::$productsNames, $j);
            if ($product) {
                $produit = Produit::factory()->create([
                    'nomPro' => $product,
                    'idCategorie' => $j % 4 + 1,
                    'description' => "Vêtement pour " . substr($product, 0, -2),
                ]);
                
                Photo::factory()->create([
                    'codePro' => $produit->codePro,
                    'lienPhoto' => url('storage/' . UtilService::getAtIndex(self::$imagePaths, $j)),
                ]);
                $i++;
            }
            $j++;
        }
    }
}
