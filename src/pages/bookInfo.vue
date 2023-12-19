<template>
  <div class="content">
    <div class="container">
      <h2 class="m-lg-3 text-center">{{ book.name }}</h2>
      <hr />
      <ul class="info">
        <li>
          <span class="fw-bold">Description: </span>{{ book.description }}
        </li>
        <li><span class="fw-bold">Genre: </span>{{ book.genre }}</li>
        <li><span class="fw-bold">Pages: </span>{{ book.pages }}</li>
        <li><span class="fw-bold">Price: </span>{{ book.price }}</li>
        <li><span class="fw-bold">Capacity: </span>{{ book.capacity }}</li>
        <li>
          <span class="fw-bold">Capacity Sold: </span>{{ book.capacitySold }}
        </li>
        <li>
          <span class="fw-bold">Authors: </span>
          <span v-for="author in authors" :key="author.id">
            <router-link
              class="author"
              :to="{ name: 'AuthorInfo', params: { id: author.id } }"
              >{{ author.name }}</router-link
            >
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { BooksAPI } from "@/api/BooksAPI/booksAPI";

export default defineComponent({
  name: "BookInfo",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      book: {},
      authors: {},
    };
  },
  async mounted() {
    const res = await BooksAPI.book(this.id);
    if (res && res.data) {
      this.book = res.data;
    }

    const authorsRes = await BooksAPI.bookAuthors(this.id);
    if (authorsRes && authorsRes.data) {
      this.authors = authorsRes.data;
    }
  },
});
</script>

<style scoped>
.container {
  margin: 20px auto;
  padding: 30px 50px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  min-height: 82vh;
  overflow-y: auto;
}
.info {
  list-style-type: none;
  font-size: 20px;
}
.author {
  color: rgb(32, 21, 9);
  text-decoration: underline;
}
.info li {
  margin: 10px;
}
</style>
