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
        Schema::create('columns', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('space_id')->unsigned();
            $table->string('name');
            $table->integer('order');
            $table->string('status')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table
                ->foreign('space_id')
                ->references('id')
                ->on('spaces')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('columns');
    }
};
