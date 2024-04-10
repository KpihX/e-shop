<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {

        Schema::dropIfExists('gestionstock');
        Schema::create('gestionstock', function (Blueprint $table) {
            $table->bigIncrements('idStock');  // Use id() for auto-incrementing primary key
            $table->unsignedInteger('qte');
            $table->datetime('dateStock');
            $table->tinyInteger('operation');
            $table->unsignedInteger('idGest');
            $table->unsignedInteger('codePro')->nullable();

            // $table->primary('idStock');
            $table->foreign('idGest')->references('idGest')->on('gestionnaire'); // Assuming 'gestionnaire' table exists
            $table->foreign('codePro')->references('codePro')->on('produit')->onDelete('set null'); // Assuming 'produits' table with 'id' primary key exists
        });
    }

    public function down()
    {
        Schema::dropIfExists('gestionstock');
    }
};
