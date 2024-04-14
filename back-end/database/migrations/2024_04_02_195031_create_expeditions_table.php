<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {

        Schema::dropIfExists('expedition');
        Schema::create('expedition', function (Blueprint $table) {
            $table->id('idExp');
            $table->unsignedInteger('idVille');
            $table->string('transporteur', 255)->collate('utf8mb4_unicode_ci');
            $table->string('prix', 255)->collate('utf8mb4_unicode_ci');
            $table->string('mobile1', 255)->collate('utf8mb4_unicode_ci')->nullable();
            $table->string('mobile2', 255)->collate('utf8mb4_unicode_ci')->nullable();

            $table->foreign('idVille')->references('idVille')->on('ville'); // Assuming 'villes' table exists
        });
    }

    public function down()
    {
        Schema::dropIfExists('expedition');
    }

};
