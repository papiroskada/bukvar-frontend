import { LoginAPIInstance } from "..";

export const AuthAPI = {
    login(username, password) {
        const url = '/auth/sign-in';
        const data = {username, password};
        return LoginAPIInstance.post(url, data);
    },
    register(userData) {
        const url = '/auth/sign-up';
        return LoginAPIInstance.post(url, userData);
    }
}