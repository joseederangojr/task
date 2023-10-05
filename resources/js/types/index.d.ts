import { BreadcrumbItemProps } from "@/components/breadcrumb";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: number;
  updated_at: number;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user?: User;
  };
  breadcrumbs: BreadcrumbItemProps[]
};
