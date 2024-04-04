<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('messagerie', function (Blueprint $table) {
            $table->unsignedBigInteger('idmsg');  // Use id() for auto-incrementing primary key
            $table->primary('idmsg');  // Use id() for auto-incrementing primary key
            $table->string('mobile', 255)->collate('utf8mb4_unicode_ci');
            $table->text('wsms')->collate('utf8mb4_unicode_ci');
            $table->datetime('dateEnvoie');
            $table->integer('type');
            $table->integer('service');

        });
    }

    public function down()
    {
        Schema::dropIfExists('messagerie');
    }
};
