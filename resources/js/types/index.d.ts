import { BreadcrumbItemProps } from "@/components/breadcrumb";
export interface Space {
    id: number;
    name: string;
    type: "personal" | "team";
    created_by_id: number;
    updated_by_id: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: number;
    updated_at: number;
}

export type PageProps<T = Record<string, unknown>> = T & {
    whoami: User;
    breadcrumbs: BreadcrumbItemProps[];
    spaces: Space[];
};
