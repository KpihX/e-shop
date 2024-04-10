<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('gestionnaire', function (Blueprint $table) {
            $table->unsignedInteger('idGest');  // Use id() for auto-incrementing primary key
            $table->primary('idGest');  // Use id() for auto-incrementing primary key
            $table->string('nomGest', 255)->collate('utf8mb4_unicode_ci');
            $table->integer('typeGest');
            $table->string('login', 255)->collate('utf8mb4_unicode_ci');
            $table->string('pwd', 255)->collate('utf8mb4_unicode_ci');
            $table->tinyInteger('actif');
            $table->string('mobile', 255)->collate('utf8mb4_unicode_ci');
        });
    }

    public function down()
    {
        Schema::dropIfExists('gestionnaire');
    }
};
