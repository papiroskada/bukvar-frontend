<template>
  <div class="card">
    <div class="card-body">
      <h1 class="text-center">Top-3 books of the week</h1>
      <div class="container">
        <div class="row justify-content-center">
          <div
            v-for="(book, index) in getTopBooks"
            :key="index"
            class="col-lg-3"
          >
            <div class="card">
              <div class="card-body">
                <h5 class="card-title fw-bold">{{ book.name }}</h5>
                <p class="card-text">
                  <span class="fw-medium">Author: </span>
                  {{ getAuthors(authors[index]) }} <br />
                  <span class="fw-medium">Genre: </span>{{ book.genre }}
                </p>
                <router-link
                  :to="{ name: 'BookInfo', params: { id: book.id } }"
                  class="btn custom-button"
                  >View</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BooksAPI } from "@/api/BooksAPI/booksAPI";

export default {
  data() {
    return {
      books: [],
      authors: [],
    };
  },
  computed: {
    getTopBooks() {
      const books = [...this.books];
      books.sort((a, b) => b.capacitySold - a.capacitySold);
      const top3Books = books.slice(0, 3);
      return top3Books;
    },
  },
  methods: {
    getAuthors(authorsArr) {
      return authorsArr.join(", ");
    },
  },
  async created() {
    const res = await BooksAPI.books();
    if (res && res.data) {
      this.books = res.data;
      const topBooks = this.getTopBooks;
      for (const book of topBooks) {
        const res = await BooksAPI.bookAuthors(book.id);
        if (res && res.data) {
          let a = res.data.map((author) => author.name);
          this.authors.push(a);
        }
      }
    }
  },
};
</script>
<style scoped>
.custom-button {
  background-color: rgb(193, 136, 80);
  color: white;
  font-weight: 600;
}
.custom-button:hover {
  background-color: rgb(174, 122, 70);
  color: white;
}
.card {
  min-height: 300px;
  margin-top: 30px;
  position: relative;
}
.btn {
  width: 100px;
  display: block;
  margin-bottom: 10px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(193, 136, 80);
  color: white;
  font-weight: 600;
}
@media (max-width: 768px) {
  h1 {
    font-size: 24px !important;
  }
  .card-img-top {
    max-width: 70%;
    margin: 5px auto;
  }
}
@media (min-width: 769px) and (max-width: 991px) {
  .card {
    max-width: 80%;
    margin: 5px auto;
  }
}
</style>
