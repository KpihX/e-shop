<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::dropIfExists('lignecarte');
        Schema::create('lignecarte', function (Blueprint $table) {
            $table->increments('id');  // Use bigIncrements() for auto-incrementing big integer primary key
            $table->unsignedInteger('idFac');
            $table->unsignedInteger('idCarte');
            $table->integer('point');
            $table->datetime('dateOpera');
            $table->decimal('montantFac', 8, 2);

            $table->foreign('idCarte')->references('idCarte')->on('client_carte'); // Assuming 'carte_client' table exists
            $table->foreign('idFac')->references('idFac')->on('facture'); // Assuming 'factures' table exists
        });
    }

    public function down()
    {
        Schema::dropIfExists('lignecarte');
    }
};
