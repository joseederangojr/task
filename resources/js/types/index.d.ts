import { FieldPath, FieldValues } from "react-hook-form";

export interface User {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt: string;
  createdAt: number;
  updatedAt: number;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user?: User;
  };
};

export type AppResponseData<T> = {
  data: T;
} & Record<any, any>

export type AppResponseError<TFieldValues extends FieldValues = FieldValues> = {
  message: string;
  errors: Record<FieldPath<TFieldValues>, string[]>;
} & Record<any, any>
