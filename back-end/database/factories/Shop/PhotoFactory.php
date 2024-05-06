<?php

namespace Database\Factories\Shop;

use App\Models\Shop\Photo;
use App\Models\Shop\Produit;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Services\UtilService;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shop\Photo>
 */
class PhotoFactory extends Factory
{
    protected $model = Photo::class;
    // protected static $imagePaths = [];

    // public static function prepareImagePaths() {
    //     // Tableaux des chemins d'images
    //     $babyImagesPaths = [
    //         'images/bebe/bebe_1.png',
    //         'images/bebe/bebe_2.png',
    //         'images/bebe/bebe_3.png',
    //         'images/bebe/bebe_4.png',
    //         'images/bebe/bebe_5.png',
    //         'images/bebe/bebe_6.png',
    //         'images/bebe/bebe_7.png',
    //         'images/bebe/bebe_8.png',
    //         'images/bebe/bebe_9.png',
    //     ];

    //     $childImagesPaths = [
    //         'images/enfant/enfant_1.png',
    //         'images/enfant/enfant_2.png',
    //         'images/enfant/enfant_3.png',
    //         'images/enfant/enfant_4.png',
    //         'images/enfant/enfant_5.png',
    //         'images/enfant/enfant_6.png',
    //         'images/enfant/enfant_7.png',
    //         'images/enfant/enfant_8.png',
            
    //     ];

    //     $manImagesPaths = [
    //         'images/homme/homme_1.png',
    //         'images/homme/homme_2.png',
    //         'images/homme/homme_3.png',
    //         'images/homme/homme_4.png',
    //         'images/homme/homme_5.png',
    //         'images/homme/homme_6.png',
    //         'images/homme/homme_7.png',
    //         'images/homme/homme_8.png',
    //         'images/homme/homme_9.png',
    //         'images/homme/homme_10.png',
    //     ];

    //     $womanImagesPaths = [
    //         'images/femme/femme_1.png',
    //         'images/femme/femme_2.png',
    //         'images/femme/femme_3.png',
    //         'images/femme/femme_4.png',
    //         'images/femme/femme_5.png',
    //         'images/femme/femme_6.png',
    //         'images/femme/femme_7.png',
    //         'images/femme/femme_8.png',
    //         'images/femme/femme_9.png',
    //     ];

    //     self::$imagePaths = UtilService::intercalateArrays($babyImagesPaths, $childImagesPaths, $manImagesPaths, $womanImagesPaths);
    // }

    // public static function getImagePathsIndex($index) {
    //     return self::$imagePaths[$index % count(self::$imagePaths)] ?? null;
    // }

    public function definition()
    {
        // Intercalate the image paths into a single array
        // $imagePaths = $this->intercalateArrays($BabyImagesPaths, $ChildImagesPaths, $ManImagesPaths, $WomanImagesPaths);
        // return [
        //     'lienPhoto' => url('storage/' . $this->faker->randomElement($imagePaths)),
        //     'codePro' => function () {
        //         return Produit::factory()->create()->codePro;
        //     },
        // ];
        // return function (array $attributes) {
        //     return [
        //         'lienPhoto' => url('storage/' . self::getImagePathsIndex($attributes['index'])),
        //         'codePro' => $attributes['codePro'],
        //     ];
        // };
        // return [
        //     'lienPhoto' => function (array $attributes) {
        //         return url('storage/' . self::getImagePathsIndex($attributes['index']));
        //     },
        //     'codePro' => function (array $attributes) {
        //         return $attributes['codePro'];
        //     },
        //     // 'codePro' => function () {
        //     //     return Produit::factory()->create()->codePro;
        //     // }
        // ];
        return [];
    }
}
