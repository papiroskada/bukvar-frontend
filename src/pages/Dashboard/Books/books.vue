<template>
  <div class="main-wrapper">
    <div>
      <router-link :to="{ name: 'Dashboard' }" class="backwards">
        <i class="fa-solid fa-arrow-left"></i>
      </router-link>
    </div>

    <div class="search">
      <div class="input-group">
        <input
          type="text"
          id="search"
          v-model="search"
          class="search__input form-control"
          placeholder="Search by First Name"
        />
        <router-link to="/dashboard/addBook">
          <button class="actions btn btn-outline-success ml-3">
            Add new Book
          </button>
        </router-link>
      </div>
    </div>
    <div class="table-wrapper table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Name</th>
            <th scope="col">Genre</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Pages</th>
            <th scope="col">Capacity</th>
            <th scope="col">Capacity sold</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="(book, index) in filteredBooks" :key="book.id">
            <td>
              <div>{{ index + 1 }}</div>
            </td>
            <td>
              <div>{{ book.name }}</div>
            </td>
            <td>
              <div>{{ book.genre }}</div>
            </td>
            <td>
              <div>{{ book.description }}</div>
            </td>
            <td>
              <div>{{ book.price }}</div>
            </td>
            <td>
              <div>{{ book.pages }}</div>
            </td>
            <td>
              <div>{{ book.capacity }}</div>
            </td>
            <td>
              <div>{{ book.capacitySold }}</div>
            </td>
            <td>
              <RouterLink
                :to="{ name: 'DashboardUpdateBook', params: { id: book.id } }"
              >
                <button class="actions btn btn-info">Edit</button>
              </RouterLink>
            </td>
            <td>
              <button
                class="actions btn btn-danger"
                @click="confirmDelete(book.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { BooksAPI } from "../../../api/BooksAPI/booksAPI";

export default defineComponent({
  name: "DashboardBooks",
  data() {
    return {
      books: [],
      search: "",
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) =>
        book.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    confirmDelete(id) {
      if (window.confirm("Are you sure you want to delete this book?")) {
        this.deleteBook(id);
      }
    },
    async deleteBook(id) {
      await BooksAPI.deleteBook(id);
      this.$router.go();
    },
  },
  async created() {
    const res = await BooksAPI.books();
    if (res && res.data) {
      this.books = res.data;
    }
  },
});
</script>

<style scoped>
.main-wrapper {
  margin: 20px;
}
.table-wrapper {
  margin: 10px 0;
}
.backwards {
  font-size: 20px;
  color: rgb(60, 60, 60);
}
.search {
  margin: 20px;
  width: 30%;
}
.search__input {
  border-radius: 3px !important;
}
@media (max-width: 768px) {
  .search {
    margin: 10px 0;
    width: 100%;
  }
}
</style>
