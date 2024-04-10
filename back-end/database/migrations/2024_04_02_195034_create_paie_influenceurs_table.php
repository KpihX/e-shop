<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('paieinfluenceur', function (Blueprint $table) {
            $table->id('idPaiement');  // Use id() for auto-incrementing primary key
            $table->datetime('datePaie');
            $table->decimal('montant', 8, 2);
            $table->unsignedBigInteger('idInf');
            $table->tinyInteger('validite');
            $table->text('commentaire')->collate('utf8mb4_unicode_ci');

            $table->foreign('idInf')->references('idInf')->on('influenceur'); // Assuming 'influenceur' table exists
        });
    }

    public function down()
    {
        Schema::dropIfExists('paieinfluenceur');
    }
};
