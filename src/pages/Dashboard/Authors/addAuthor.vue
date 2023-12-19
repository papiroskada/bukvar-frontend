<template>
  <div class="wrapper">
    <form @submit.prevent="onSubmit" class="custom-form">
      <h2 class="form-title">Add Author</h2>
      <ErrorMessage :errors="errors" :hasErrors="hasErrors" class="errors" />
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
        <label class="form-label" for="age"> Age </label>
        <input
          v-model.trim="age"
          class="form-input"
          id="age"
          type="number"
          min="0"
        />
      </div>
      <div class="form-group-button">
        <button class="btn custom-btn">Add Author</button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ErrorMessage from "../../../components/error.vue";
import { AuthorsAPI } from "../../../api/AuthorsAPI/authorsAPI";

export default defineComponent({
  name: "DashboardAddAuthor",
  components: { ErrorMessage },
  data() {
    return {
      name: "",
      age: null,
      description: "",
      errors: {
        name: "",
        age: "",
        description: "",
      },
    };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some((error) => error !== "");
    },
  },
  methods: {
    clearErrors(fieldName) {
      this.errors[fieldName] = "";
    },
    async onSubmit() {
      if (!this.hasErrors) {
        if (!this.name) {
          this.errors.name = "Enter the name";
        }

        const res = await AuthorsAPI.createAuthor({
          name: this.name,
          age: this.age,
          characteristic: this.description,
        });

        if (res && res.data) {
          this.$router.push({ name: "DashboardAuthors" });
        }
      }
    },
    validateName(name) {
      let error = "";
      const ukrainianLettersRegex = /^[A-Z][a-zA-Z]{2,}/;
      if (!ukrainianLettersRegex.test(name)) {
        error = `The field should be written in English and start with a capital letter`;
      }

      return error;
    },
    validateAge(age) {
      let error = "";
      if (age > 110 || age < 18) {
        error = `Author must be over 18 under 110 years old.`;
      }

      return error;
    },
    validateDescription(description) {
      let error = "";
      if (description.length > 255) {
        error = `Description should be less than 255 characters`;
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
    age: function (newVal) {
      if (newVal) {
        this.clearErrors("age");
        this.errors.age = this.validateAge(newVal);
      }
    },
    description: function (newVal) {
      if (newVal) {
        this.clearErrors("description");
        this.errors.description = this.validateDescription(newVal);
      }
    },
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
