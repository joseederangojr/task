<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class MoveTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->task);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'from_column_id' => 'required|exists:columns,id',
            'from_order' => 'required',
            'to_column_id' => 'required|exists:columns,id',
            'to_order' => 'required',
        ];
    }
}
