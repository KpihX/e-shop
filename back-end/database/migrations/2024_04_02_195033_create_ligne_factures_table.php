<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('lignefacture', function (Blueprint $table) {
            $table->increments('idLFac');  // Use id() for auto-incrementing primary key
            $table->unsignedInteger('codePro');
            $table->unsignedInteger('idFac');
            $table->decimal('prix', 8, 2);
            $table->smallInteger('qte');

            $table->foreign('idFac')->references('idFac')->on('facture'); // Assuming 'factures' table exists
            $table->foreign('codePro')->references('codePro')->on('produit'); // Assuming 'produits' table with 'id' primary key exists
        });
    }

    public function down()
    {
        Schema::dropIfExists('lignefacture');
    }
};
