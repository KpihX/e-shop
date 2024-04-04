<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('commande', function (Blueprint $table) {

            $table->unsignedBigInteger('idCommande'); // Use id() for auto-incrementing primary key
            $table->primary('idCommande'); // Use id() for auto-incrementing primary key
            $table->timestamp('dateCom');
            $table->decimal('montant', 8, 2);
            $table->string('nomClient', 255)->collate('utf8mb4_unicode_ci');
            $table->string('mobile', 255)->collate('utf8mb4_unicode_ci');
            $table->text('adresse')->collate('utf8mb4_unicode_ci');
            $table->string('commentaire', 255)->collate('utf8mb4_unicode_ci')->nullable();
            $table->tinyInteger('livrer');
            $table->decimal('avance', 8, 2);
            $table->string('remise', 255)->collate('utf8mb4_unicode_ci');
            $table->tinyInteger('type');
            $table->unsignedBigInteger('idVille');

            $table->foreign('idVille')->references('idVille')->on('ville'); // Assuming 'villes' table exists
        });
    }

    public function down()
    {
        Schema::dropIfExists('commande');
    }
};
