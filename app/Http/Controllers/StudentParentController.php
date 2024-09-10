<?php

namespace App\Http\Controllers;

use App\Models\StudentParent;
use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use App\Http\Resources\StudentParentResource;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $columns = $request->get('columns');
    $parents = !empty($columns) ? StudentParent::all($columns) : StudentParent::all();
    return StudentParentResource::collection($parents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentParentRequest $request)
    {
        //
        $formFields=$request->validated();
        $formFields['last_login']=new DateTime();
        $formFields['password']=Hash::make($formFields['password']);
        $parent=StudentParent::create($formFields);
        $response= new StudentParentResource($parent);
        return response()->json([
            'parent'=>$response,
            'message'=>__('Parent Created Successfully')
        ]/*,201*/);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentParent $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentParentRequest $request, StudentParent $parent)
    {
        //
        $formFields=$request->validated();
        $formFields['password']=Hash::make($formFields['password']);
        $parent->update($formFields);
        return response()->json([
            'parent'=>$parent,
            'message'=>__('Parent Updated Successfully')
        ]/*,201*/);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $parent)
    {
        //

        $parent->delete();
         return new StudentParentResource($parent);
    }
}
