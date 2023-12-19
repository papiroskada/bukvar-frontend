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
          placeholder="Search by Name"
        />
        <router-link to="/dashboard/addAuthor">
          <button class="actions actions__add btn btn-outline-success ml-3">
            Add new Author
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
            <th scope="col">Age</th>
            <th scope="col">Characteristic</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="(author, index) in filteredAuthors" :key="author.id">
            <td>
              <div>{{ index + 1 }}</div>
            </td>
            <td>
              <div>{{ author.name }}</div>
            </td>
            <td>
              <div>{{ author.age }}</div>
            </td>
            <td>
              <div>{{ author.characteristic }}</div>
            </td>
            <td>
              <button class="btn btn-danger" @click="confirmDelete(author.id)">
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
import { AuthorsAPI } from "../../../api/AuthorsAPI/authorsAPI";

export default defineComponent({
  name: "DashboardAuthors",
  data() {
    return {
      authors: [],
      search: "",
    };
  },
  computed: {
    filteredAuthors() {
      return this.authors.filter((author) =>
        author.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    confirmDelete(id) {
      if (window.confirm("Are you sure you want to delete the author?")) {
        this.deleteAuthor(id);
      }
    },
    async deleteAuthor(id) {
      //need response
      await AuthorsAPI.deleteAuthor(id);
      this.$router.go();
    },
  },
  async created() {
    const res = await AuthorsAPI.authors();
    if (res && res.data) {
      this.authors = res.data;
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
