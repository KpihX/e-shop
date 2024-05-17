<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('lignecommande', function (Blueprint $table) {
            $table->increments('idLignCom');  // Use id() for auto-incrementing primary key
            $table->unsignedInteger('idCommande');
            $table->unsignedInteger('codePro');
            $table->integer('quantite');
            $table->string('taille', 255)->collate('utf8mb4_unicode_ci')->nullable();
            $table->string('couleur', 255)->collate('utf8mb4_unicode_ci')->nullable();
            $table->tinyInteger('disponible');

            $table->decimal('prix', 8, 0);

            $table->foreign('idCommande')->references('idCommande')->on('commande'); // Assuming 'commande' table exists
            $table->foreign('codePro')->references('codePro')->on('produit'); // Assuming 'produits' table with 'id' primary key exists
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('lignecommande');
    }
};
