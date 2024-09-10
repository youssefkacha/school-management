<?php

namespace App\Http\Controllers;

use App\Models\StudentParent;
use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use DateTime;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
    return StudentResource::collection(User::all());
  }

  public function store(StoreStudentRequest $request)
  {
    //
    $formFields = $request->validated();
    $formFields['last_login'] = new DateTime();
    $formFields['password'] = Hash::make($formFields['password']);
    $parent = User::create($formFields);
    $response = new StudentResource($parent);
    return response()->json([
      'parent' => $response,
      'message' => __('Student Created Successfully')
    ]/*,201*/);
  }

  public function update(StoreStudentRequest $request, User $student)
  {
    $formFields = $request->validated();
    $formFields['password'] = Hash::make($formFields['password']);
    $student->update($formFields);
    return response()->json([
      'student' => new StudentResource($student),
      'message' => __('Student updated successfully')
    ]);
  }
  public function destroy(User $student)
  {
    $student->delete();

    return new StudentResource($student);
  }
}
