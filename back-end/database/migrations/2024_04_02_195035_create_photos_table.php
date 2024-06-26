<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('photo', function (Blueprint $table) {
            $table->increments('idPhoto');  // Use id() for auto-incrementing primary key
            $table->string('lienPhoto', 255)->collate('utf8mb4_unicode_ci');
            $table->unsignedInteger('codePro');
            
            $table->foreign('codePro')->references('codePro')->on('produit'); // Assuming 'produits' table with 'id' primary key exists
        });
    }

    public function down()
    {
        Schema::dropIfExists('photo');
    }
};
