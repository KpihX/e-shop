<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('fournisseur', function (Blueprint $table) {
            $table->unsignedInteger('idFour');

            $table->primary('idFour');  // Use id() for auto-incrementing primary key
            $table->string('nom', 255)->collate('utf8mb4_unicode_ci');
            $table->string('adresse', 255)->collate('utf8mb4_unicode_ci');
            $table->string('ville', 255)->collate('utf8mb4_unicode_ci');
            $table->string('pays', 255)->collate('utf8mb4_unicode_ci');
            $table->string('mobile1', 255)->collate('utf8mb4_unicode_ci');
            $table->string('mobile2', 255)->collate('utf8mb4_unicode_ci');
            $table->datetime('dateCreation');
            $table->tinyInteger('type');
        });
    }

    public function down()
    {
        Schema::dropIfExists('fournisseur');
    }
};
