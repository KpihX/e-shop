<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('influenceur', function (Blueprint $table) {
            $table->unsignedBigInteger('idInf');  // Use id() for auto-incrementing primary key
            $table->primary('idInf');
            $table->string('nom', 255)->collate('utf8mb4_unicode_ci');
            $table->string('mobile', 255)->collate('utf8mb4_unicode_ci');
            $table->string('codePromo', 255)->collate('utf8mb4_unicode_ci');
            $table->tinyInteger('actif');
            $table->decimal('montant', 8, 2);
            $table->string('pwd', 255)->collate('utf8mb4_unicode_ci');
        });
    }

    public function down()
    {
        Schema::dropIfExists('influenceur');
    }
};
