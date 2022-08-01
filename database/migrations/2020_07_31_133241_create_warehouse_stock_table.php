<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWarehouseStockTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('warehouse_stock', function (Blueprint $table) {
            // $table->id();
            $table->uuid('id')->primary();
            $table->char('warehouse_id');
            $table->foreign('warehouse_id')->references('id')->on('warehouse')->nullable();
            $table->char('stock_id');
            $table->foreign('stock_id')->references('id')->on('stock')->nullable();
            $table->char('trade_id');
            $table->foreign('trade_id')->references('id')->on('trade')->nullable();
            $table->integer('quantity');
            $table->string('type')->nullable();
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
        Schema::dropIfExists('warehouse_stock');
    }
}