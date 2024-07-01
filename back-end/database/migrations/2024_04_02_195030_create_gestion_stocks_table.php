<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gestionStock', function (Blueprint $table) {
            $table->increments('idStock');
            $table->unsignedInteger('qte');
            $table->dateTime('dateStock');
            $table->tinyInteger('operation');
            $table->unsignedInteger('idGest');
            $table->unsignedInteger('codePro');

            $table->foreign('idGest')->references('idGest')->on('gestionnaire');
            $table->foreign('codePro')->references('codePro')->on('produit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gestionStock');
    }
};