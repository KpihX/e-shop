<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::dropIfExists('achatfournisseur');
        Schema::create('achatfournisseur', function (Blueprint $table) {
            $table->id('idAchat');
            $table->string('lienFac', 255)->collate('utf8mb4_unicode_ci');
            $table->datetime('dateInsertion');
            $table->decimal('montantFac', 8, 2);
            $table->decimal('montantCargo', 8, 2);
            $table->decimal('totalKg', 8, 2);
            $table->decimal('montantGlobal', 8, 2);
            $table->unsignedInteger('idFour');
            $table->unsignedInteger('idCargo');

            $table->foreign('idFour')->references('idFour')->on('fournisseur');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achatfournisseur');
    }
};
