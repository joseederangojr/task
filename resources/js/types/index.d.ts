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
    columns?: Column[];
    tasks?: Task[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: number;
    updated_at: number;
}

export type TaskStatus = "triage" | "todo" | "doing" | "done" | "abandon";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    due_date: string;
    space_id: number;
    column_id: number;
    assigned_to_id?: number;
    order: number;
    created_by_id: number;
    updated_by_id: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    space?: Space;
    column?: Column;
}

export interface Column {
    id: number;
    name: string;
    order: number;
    status: "triage" | "todo" | "doing" | "done" | "abandon" | string;
    space_id: number;
    created_by_id: number;
    updated_by_id: number;
    created_at: number;
    updated_at: number;
    space?: Space;
    tasks?: Task[];
}

export type PageProps<T = Record<string, unknown>> = T & {
    whoami: User;
    breadcrumbs: BreadcrumbItemProps[];
    spaces: Space[];
};
