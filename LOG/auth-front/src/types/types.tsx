export interface AuthResponse {
    body:{
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}
export interface AuthResponseError {
    body:{
        accessToken: any;
        refreshToken: any;
        error: string;
    };
}
export interface User {
    _id: number;
    name: string;
    username: string;
}