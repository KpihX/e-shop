<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('categorie', function (Blueprint $table) {
            $table->unsignedInteger('idCat');
            $table->string('nomCat', 255)->collate('utf8mb4_unicode_ci');

            $table->primary('idCat');
        });
    }

    public function down()
    {
        Schema::dropIfExists('categorie');
    }
};
