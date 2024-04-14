<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Shop\ville as ShopVille;

class VilleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $nomsVilles = [
            'Douala', 'Yaoundé', 'Garoua', 'Bamenda', 'Maroua','Nkongsamba','Bafoussam','Ngaoundéré','Bertoua','Loum','Kumba','Edéa','Kumbo','Foumban',
            'Mbouda','Dschang','Limbé','Ebolowa','Kousséri','Guider','Meiganga','Yagoua','Mbalmayo','Bafang','Tiko','Bafia','Wum','Kribi','Buea','Sangmélima',
            'Foumbot','Bangangté','Batouri','Banyo','Nkambé','Bali','Mbanga','Mokolo','Melong','Manjo','Garoua-Boulaï','Mora','Kaélé','Tibati','Ndop',
            'Akonolinga','Eséka','Mamfé','Obala','Muyuka'
        ];
        $_ville = new ShopVille();
        $i=1;
        foreach ($nomsVilles as $ville) {
            $_ville->insert(['idVille'=>$i,'libelle'=>$ville]);
            $i+=1;
        }
    }
}
