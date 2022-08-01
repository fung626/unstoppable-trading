<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_item', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->char('invoice_id');
            $table->foreign('invoice_id')->references('id')->on('invoice');
            $table->char('goods_id');
            $table->foreign('goods_id')->references('id')->on('goods');
            $table->integer('quantity');
            $table->double('price', 8, 2)->nullable();
            $table->integer('type')->nullable();
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
        Schema::dropIfExists('shipping');
    }
}