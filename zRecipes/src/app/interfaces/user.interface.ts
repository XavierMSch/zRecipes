export interface User {
    id: number;
    username: string;
    email: string;
    rut?: string;
    region: string;
    comuna: string;
    is_admin: boolean;
}