import type { FieldValues, FieldPath } from 'react-hook-form'

export type AppErrorProps<T> = {
  data: T;
  message?: string;
  status?: number;
}

export class AppError<TError extends any> extends Error {
  readonly status: number;
  readonly data: TError
  constructor({ data, status = 500, message = 'AppError' }: AppErrorProps<TError>) {
    super(message);
    this.data = data;
    this.status = status;
  }
}

export class ValidationError<TFieldValues extends FieldValues = FieldValues> extends Error {
  readonly errors: Record<FieldPath<TFieldValues>, string[]>;
  constructor(errors: Record<FieldPath<TFieldValues>, string[]>) {
    super('ValidationError');
    this.errors = errors;
  }
}

export class UnknownError extends Error { }
