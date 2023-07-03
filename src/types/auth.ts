export interface LoginDTO {
    email: string;
    password: string;
}
export interface RegisterDTO {
    firstName: string;
    lastName:string;
    address?: string;
    phone?: string;
    email: string;
    password: string;
}