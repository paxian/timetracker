<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\TimeEntry;
use Request;

class TimeEntriesController extends Controller
{
    /**
     * Gets time entries and eager loads their associated users.
     *
     * @return Response
     */
    public function index()
    {
        $time = TimeEntry::with('user')->get();

        return $time;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $data = Request::all();

        $timeentry = new TimeEntry();

        $timeentry->fill($data);

        $timeentry->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Grab all the data passed into the request and fill the database record with the new data.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $timeentry = TimeEntry::find($id);

        $data = Request::all();

        $timeentry->fill($data);

        $timeentry->save();
    }

    /**
     * Find the time entry to be deleted and then call delete.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $timeentry = TimeEntry::find($id);

        $timeentry->delete();
    }
}
