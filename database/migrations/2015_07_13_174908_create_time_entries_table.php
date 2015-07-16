<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTimeEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('time_entries', function(Blueprint $t)
        {
          $t->increments('id');
          $t->integer('user_id')->unsigned();
          $t->dateTime('start_time');
          $t->dateTime('end_time');
          $t->string('comment')->nullable();
          $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dump('time_entries');
    }
}
