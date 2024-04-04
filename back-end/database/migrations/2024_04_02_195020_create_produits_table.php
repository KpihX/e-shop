<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::dropIfExists('produit');
        Schema::create('produit', function (Blueprint $table) {
            $table->unsignedBigInteger('codePro');  // Use id() for auto-incrementing primary key (assuming codePro is unique)
            $table->primary('codePro');  // Use id() for auto-incrementing primary key (assuming codePro is unique)
            $table->unsignedInteger('idCategorie');
            $table->string('nomPro', 255)->collate('utf8mb4_unicode_ci');
            $table->decimal('prix', 8, 0);
            $table->unsignedInteger('qte');
            $table->text('description')->collate('utf8mb4_unicode_ci');
            $table->string('codeArrivage', 255)->collate('utf8mb4_unicode_ci');
            $table->tinyInteger('actif');
            $table->date('dateInsertion');
            $table->decimal('prixAchat', 8, 0);
            $table->decimal('pourcentage', 2, 2);  // Consider using a decimal for more precise percentage calculations
            $table->tinyInteger('promo');
            $table->integer('size1');
            $table->integer('size2');
            $table->integer('typeSize');

            $table->foreign('idCategorie')->references('idCat')->on('categorie'); // Assuming 'categories' table with 'id' primary key exists
        });
    }

    public function down()
    {
        Schema::dropIfExists('produit');
    }
};
