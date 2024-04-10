<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {

        Schema::dropIfExists('ville');
        Schema::create('ville', function (Blueprint $table) {

            $table->unsignedBigInteger('idVille');
            $table->string('libelle', 255)->collate('utf8mb4_unicode_ci');

            $table->primary('idVille');

        });
    }

    public function down()
    {
        Schema::dropIfExists('ville');
    }
};
