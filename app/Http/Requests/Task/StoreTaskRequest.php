<?php

namespace App\Http\Requests\Task;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Task::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'space_id' => 'required|exists:spaces,id',
            'column_id' => 'required|exists:columns,id',
            'title' => 'required|string|max:100',
            'description' => 'string',
            'status' => 'in:triage,todo,doing,done,abandon',
            'assigned_to_id' => 'int|nullable|exists:users,id',
            'due_date' => 'date|nullable',
        ];
    }
}
