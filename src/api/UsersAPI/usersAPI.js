import { DefaultAPIInstance } from "..";

export const UsersAPI = {
    users() {
        const url = `/users`;
        return DefaultAPIInstance.get(url);
    },
    user(id) {
        const url = `users/${id}`;
        return DefaultAPIInstance.get(url);
    },
}