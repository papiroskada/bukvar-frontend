<template>
  <div class="wrapper">
    <form @submit.prevent="onSubmit" class="custom-form">
      <h2 class="form-title">Edit Book</h2>
      <div class="form-group">
        <label class="form-label" for="name"> Name </label>
        <input
          v-model.trim="name"
          class="form-input"
          id="name"
          type="text"
          placeholder="Enter name"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="description"> Description </label>
        <textarea
          v-model.trim="description"
          class="form-input"
          id="description"
          placeholder="Enter description"
        >
        </textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="genre"> Genre </label>
        <input
          v-model.trim="genre"
          class="form-input"
          id="genre"
          type="text"
          :disabled="true"
          placeholder="Enter genre"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="pages"> Pages </label>
        <input
          v-model.trim="pages"
          class="form-input"
          id="pages"
          type="number"
          placeholder="Enter pages count"
          min="0"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="price"> Price </label>
        <input
          v-model.trim="price"
          class="form-input"
          id="price"
          type="number"
          min="0"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="capacity"> Capacity </label>
        <input
          v-model.trim="capacity"
          class="form-input"
          id="capacity"
          type="number"
          min="0"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="capacitySold"> Capacity Sold </label>
        <input
          v-model.trim="capacitySold"
          class="form-input"
          id="capacitySold"
          type="number"
          min="0"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="authors"> Select Authors: </label>
        <VueMultiselect
          v-model="selectedAuthors"
          track-by="name"
          :options="filteredAuthors"
          label="name"
          placeholder="Select authors"
          :multiple="true"
          :searchable="true"
          :close-on-select="false"
        >
        </VueMultiselect>
      </div>
      <div class="form-group-button">
        <button class="btn custom-btn">Update Book</button>
      </div>
      <ErrorMessage :errors="errors" :hasErrors="hasErrors" class="errors" />
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ErrorMessage from "../../../components/error.vue";
import { BooksAPI } from "../../../api/BooksAPI/booksAPI";
import VueMultiselect from "vue-multiselect";
import { AuthorsAPI } from "@/api/AuthorsAPI/authorsAPI";
import "vue-multiselect/dist/vue-multiselect.css";

export default defineComponent({
  name: "DashboardUpdateBook",
  components: { ErrorMessage, VueMultiselect },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      name: "",
      description: "",
      price: 0,
      genre: "",
      pages: "",
      capacity: 0,
      capacitySold: 0,
      authors: [],
      selectedAuthors: [],
      searchQuery: "",
      errors: {
        name: "",
        price: "",
        description: "",
        pages: "",
        genre: "",
        capacity: "",
        capacitySold: "",
        submit: "",
      },
    };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some((error) => error !== "");
    },
    filteredAuthors() {
      const query = this.searchQuery.toLowerCase();
      return this.authors.filter((author) =>
        author.name.toLowerCase().includes(query)
      );
    },
    getAuthorsIndexes() {
      return this.selectedAuthors.map((author) => author.id);
    },
  },
  methods: {
    clearErrors(fieldName) {
      this.errors[fieldName] = "";
    },
    async onSubmit() {
      if (!this.hasErrors) {
        if (
          !this.name ||
          !this.price ||
          !this.description ||
          !this.pages ||
          !this.genre ||
          !this.capacity ||
          !this.capacitySold
        ) {
          this.errors.submit = "Check all the fields not to be empty!";
          return;
        }
        if (this.capacity < this.capacitySold) {
          this.errors.submit = "Capacity cannot be less than sold";
          return;
        }

        const res = await BooksAPI.updateBook(this.id, {
          name: this.name,
          description: this.description,
          price: this.price,
          pages: this.pages,
          capacity: this.capacity,
          capacitySold: this.capacitySold,
          authorIndices: this.getAuthorsIndexes,
        });

        if (res && res.data) {
          this.$router.push({ name: "DashboardBooks" });
        }
      }
    },
    validateName(name) {
      let error = "";
      const ukrainianLettersRegex = /^[A-Z][a-zA-Z]{2,}/;
      if (!ukrainianLettersRegex.test(name)) {
        error = `Поле повинно бути написане англійською та починатися з великої літери.`;
      }

      return error;
    },
    validateDescription(description) {
      let error = "";
      if (description.length > 255) {
        error = `Опис не може бути більшим за 255 символів`;
      }

      return error;
    },
    validatePrice(price) {
      let error = "";
      if (price > 9999.99) {
        error = "Price cannot be bigger than 9999,99";
      } else if (price <= 0) {
        error = "Price cannot be less than 0";
      }

      return error;
    },
    validateGenre(genre) {
      let error = "";
      if (/\d/.test(genre) || genre.length < 3) {
        error = `Genre must be at least 3 characters and contain only alphabet letters`;
      }
      return error;
    },
    validateCapacity(capacity) {
      let error = "";
      if (capacity < 0) {
        error = "Capacity cannot be less than 0";
      }
      return error;
    },
    validatePages(pages) {
      let error = "";
      if (pages < 0) {
        error = "Pages cannot be less than 0";
      }
      return error;
    },
  },
  watch: {
    name: function (newVal) {
      if (newVal) {
        this.clearErrors("name");
        this.errors.name = this.validateName(newVal);
      }
    },
    price: function (newVal) {
      if (newVal) {
        this.clearErrors("price");
        this.errors.price = this.validatePrice(newVal);
      }
    },
    description: function (newVal) {
      if (newVal) {
        this.clearErrors("description");
        this.errors.description = this.validateDescription(newVal);
      }
    },
    genre: function (newVal) {
      if (newVal) {
        this.clearErrors("genre");
        this.errors.genre = this.validateGenre(newVal);
      }
    },
    capacity: function (newVal) {
      if (newVal) {
        this.clearErrors("capacity");
        this.errors.capacity = this.validateCapacity(newVal);
      }
    },
    capacitySold: function (newVal) {
      if (newVal) {
        this.clearErrors("capacitySold");
        this.errors.capacitySold = this.validateCapacity(newVal);
      }
    },
    pages: function (newVal) {
      if (newVal) {
        this.clearErrors("pages");
        this.errors.pages = this.validatePages(newVal);
      }
    },
  },
  async mounted() {
    const allAuthorsRes = await AuthorsAPI.authors();
    if (allAuthorsRes && allAuthorsRes.data) {
      this.authors = allAuthorsRes.data;
    }

    const bookRes = await BooksAPI.book(this.id);
    if (bookRes && bookRes.data) {
      ({
        name: this.name,
        description: this.description,
        price: this.price,
        genre: this.genre,
        pages: this.pages,
        capacity: this.capacity,
        capacitySold: this.capacitySold,
      } = bookRes.data);
    }

    const bookAuthorsRes = await BooksAPI.bookAuthors(this.id);
    if (bookAuthorsRes && bookAuthorsRes.data) {
      this.selectedAuthors = [...bookAuthorsRes.data];
    }
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
}

.custom-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 2rem;
  margin-bottom: 1rem;
  width: 100%; // Updated width to 100%
  max-width: 500px; // Added max-width for larger screens
  box-sizing: border-box; // Added box-sizing to include padding in width calculation
}

.form-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  color: rgb(45, 36, 27);
  margin-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
}

.form-group {
  margin-bottom: 30px;
}

.form-group-button {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-label {
  display: block;
  font-size: 24px;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.custom-btn:disabled {
  border: 1px solid rgb(193, 136, 80);
  background-color: rgb(255, 255, 255);
  color: rgb(112, 81, 50);
}

.custom-btn:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(156, 104, 53);
}

.custom-btn {
  background-color: rgb(193, 136, 80);
  color: #ffffff;
  padding: 10px;
  font-size: 18px;
}

.errors {
  display: flex;
  text-align: center;
  justify-content: center;
}

// Media queries for responsiveness
@media (max-width: 600px) {
  .wrapper {
    width: 90%;
    margin: 20px auto;
  }
  .custom-form {
    padding: 1rem;
  }

  .form-title {
    font-size: 28px;
  }

  .form-input {
    font-size: 16px;
  }

  .form-label {
    font-size: 20px;
  }
}
</style>
