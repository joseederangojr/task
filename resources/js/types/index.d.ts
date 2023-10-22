import { BreadcrumbItemProps } from "@/components/breadcrumb";
import { ClassAttributes, HTMLAttributes as BaseHTMLAttributes } from "react";

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

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    user: {
        whoami?: User;
        spaces: Space[];
    };

    breadcrumbs: BreadcrumbItemProps[];
};
