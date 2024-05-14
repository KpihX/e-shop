<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class GestionnaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Supposons que les types soient définis comme suit : 0 pour admin, 1 pour gestionnaire, 2 pour caissière
        $gestionnaires = [
            [
                'nomGest' => 'Admin',
                'typeGest' => 0, // Admin
                'login' => 'ADMIN1',
                'pwd' => Hash::make('admin'),
                'actif' => 1,
                'mobile' => '678541236',
            ],
            [
                'nomGest' => 'Gest',
                'typeGest' => 1, // Gestionnaire
                'login' => 'GEST2',
                'pwd' => Hash::make('gest'),
                'actif' => 1,
                'mobile' => '658745232',
            ],
            [
                'nomGest' => 'Cais',
                'typeGest' => 2, // Caissière
                'login' => 'CAIS3',
                'pwd' => Hash::make('cais'),
                'actif' => 1,
                'mobile' => '677423130',
            ],
        ];

        foreach ($gestionnaires as $gestionnaire) {
            DB::table('gestionnaire')->insert($gestionnaire);
        }
    }
}
