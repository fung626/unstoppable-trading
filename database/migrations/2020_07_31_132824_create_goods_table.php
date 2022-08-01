<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('goods', function (Blueprint $table) {
            $table->uuid('id')->primary();
            // $table->string('id', 100)->primary();
            $table->char('category_id');
            $table->foreign('category_id')->references('id')->on('category');
            $table->char('supplier_id');
            $table->foreign('supplier_id')->references('id')->on('supplier');
            $table->string('name');
            $table->string('image');
            $table->double('price', 8, 2);
            $table->integer('category')->nullable();
            $table->json('contents');
            $table->char('description', 245)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('goods');
    }
}