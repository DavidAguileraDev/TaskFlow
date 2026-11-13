export interface AuthData{
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
    acceptTerms?: boolean;
}