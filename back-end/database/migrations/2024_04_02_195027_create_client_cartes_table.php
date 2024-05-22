<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('client_carte', function (Blueprint $table) {
            $table->increments('idCarte'); // Use id() for auto-incrementing primary key
            // $table->primary('idCarte'); // Use id() for auto-incrementing primary key
            $table->string('nom', 255)->collate('utf8mb4_unicode_ci');
            $table->tinyInteger('sexe');
            $table->string('dateNaiss', 255)->collate('utf8mb4_unicode_ci');
            $table->unsignedInteger('idVille');
            $table->string('mobile', 255)->collate('utf8mb4_unicode_ci');
            $table->tinyInteger('whatsapp');
            $table->datetime('creation');
            $table->unsignedInteger('point');
            $table->decimal('montantTontine', 8, 2);
        });
    }

    public function down()
    {
        Schema::dropIfExists('client_carte');
    }
};
