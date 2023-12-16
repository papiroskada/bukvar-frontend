import { LoginAPIInstance, DefaultAPIInstance } from "..";

export const AuthorsAPI = {
    authors() {
        const url = `/authors`;
        return LoginAPIInstance.get(url);
    },
    createAuthor(payload) {
        const url = '/authors';
        return DefaultAPIInstance.post(url, payload);
    },
    updateAuthor(id, payload) {
        const url = `authors/${id}`;
        return DefaultAPIInstance.patch(url, payload);
    },
    author(id) {
        const url = `authors/${id}`;
        return DefaultAPIInstance.get(url);
    },
    deleteAuthor(id) {
        const url = `authors/${id}`;
        return DefaultAPIInstance.delete(url);
    },
}