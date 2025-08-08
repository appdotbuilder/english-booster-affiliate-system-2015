<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReferralRequest extends FormRequest
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
            'program_id' => 'required|exists:programs,id',
            'student_name' => 'required|string|max:255',
            'student_email' => 'required|email|max:255',
            'student_phone' => 'required|string|max:20',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'program_id.required' => 'Program wajib dipilih.',
            'program_id.exists' => 'Program yang dipilih tidak valid.',
            'student_name.required' => 'Nama siswa wajib diisi.',
            'student_email.required' => 'Email siswa wajib diisi.',
            'student_email.email' => 'Format email siswa tidak valid.',
            'student_phone.required' => 'Nomor telepon siswa wajib diisi.',
        ];
    }
}