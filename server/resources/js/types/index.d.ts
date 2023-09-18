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
