<?php

namespace App\Http\Requests;

use App\Enums\BloodEnum;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentParentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
              //
              'first_name' => 'required|max:50',
              'last_name' => 'required|max:50',
              'date_of_birth' => 'required|date',
              'gender' => ['required', Rule::in(['m', 'f'])],
              'blood_type' => ['required', Rule::enum(BloodEnum::class)],
              'address' => 'required|max:255',
              'phone' => Rule::unique('student_parents')->ignore($this->id),
              'email' =>  Rule::unique('student_parents')->ignore($this->id),
              'password' => 'required',
        ];
    }
}
