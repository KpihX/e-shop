<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('tontine', function (Blueprint $table) {
            $table->bigIncrements('idTontine');  // Use bigIncrements() for auto-incrementing big integer primary key
            $table->datetime('dateCotisation');
            $table->decimal('montant', 8, 2);
            $table->text('commentaire')->nullable()->collate('utf8mb4_unicode_ci');  // Allow null values for commentaire
            $table->unsignedInteger('idGest');
            $table->tinyInteger('validite');
            $table->unsignedInteger('idCarte');
            $table->tinyInteger('action');

            // $table->primary('idTontine');
            $table->foreign('idGest')->references('idGest')->on('gestionnaire'); // Assuming 'gests' table with 'id' primary key exists
            $table->foreign('idCarte')->references('idCarte')->on('client_carte'); // Assuming 'cartes' table with 'id' primary key exists
        });
    }

    public function down()
    {
        Schema::dropIfExists('tontine');
    }
};
