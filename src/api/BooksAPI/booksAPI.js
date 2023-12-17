import { DefaultAPIInstance } from "..";

export const BooksAPI = {
    books() {
        const url = `/books`;
        return DefaultAPIInstance.get(url);
    },
    booksWithPagination({currentPage, pageSize}) {
        const url = `/books?page=${currentPage}&pageSize=${pageSize}`;
        return DefaultAPIInstance.get(url);
    },
    createBook(payload) {
        const url = '/books';
        return DefaultAPIInstance.post(url, payload);
    },
    updateBook(id, payload) {
        const url = `books/${id}`;
        return DefaultAPIInstance.patch(url, payload);
    },
    book(id) {
        const url = `books/${id}`;
        return DefaultAPIInstance.get(url);
    },
    deleteBook(id) {
        const url = `books/${id}`;
        return DefaultAPIInstance.delete(url);
    },
    bookAuthors(id) {
        const url = `books/${id}/authors`;
        return DefaultAPIInstance.get(url);
    }
}