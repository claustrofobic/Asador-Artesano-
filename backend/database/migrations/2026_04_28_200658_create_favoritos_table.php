<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('favoritos', function (Blueprint $table) {
    $table->id();
    $table->integer('user_id');
    $table->integer('plato_id');
    $table->foreign('plato_id')->references('id')->on('platos')->onDelete('cascade');
    $table->foreign('user_id')->references('id')->on('usuarios')->onDelete('cascade');
    $table->timestamps();
    $table->unique(['user_id', 'plato_id']);
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favoritos');
    }
};
