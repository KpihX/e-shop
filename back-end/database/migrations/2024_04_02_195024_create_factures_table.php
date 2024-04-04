<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('facture', function (Blueprint $table) {
            $table->unsignedBigInteger('idFac');
            $table->primary('idFac');
            $table->datetime('dateFac');
            $table->decimal('remise', 8, 2);
            $table->decimal('montant', 8, 2);
            $table->string('tel', 255)->collate('utf8mb4_unicode_ci');
            $table->smallInteger('typeFac');
            $table->bigInteger('idCaissiere');
            $table->decimal('capital', 8, 2);
            $table->decimal('tva', 8, 2);
        });
    }

    public function down()
    {
        Schema::dropIfExists('facture');
    }
};
