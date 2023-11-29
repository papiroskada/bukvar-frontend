<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div
          class="col-sm-5 mx-auto form shadow-sm p-3 mb-5 bg-body-tertiary rounded"
        >
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="formData.email"
                @input="validateField('email')"
                placeholder="example@ex.com"
              />
              <span class="form-text">{{ errors.email }}</span>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                aria-describedby="passwordHelp"
                v-model="formData.password"
                @input="validateField('password')"
                placeholder="**********"
              />
              <span class="form-text">{{ errors.password }}</span>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
              <button
                type="submit"
                class="btn btn-outline-success"
                :disabled="!isFormValid"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  directives: { mask },
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      errors: {},
      isFormValid: false,
    };
  },
  watch: {
    formData: {
      handler: function () {
        this.validateForm();
      },
      deep: true,
    },
  },
  methods: {
    validateField(fieldName) {
      this.errors[fieldName] = "";

      const validationRules = {
        username: this.validateUsername,
        email: this.validateEmail,
        password: this.validatePassword,
      };

      if (validationRules[fieldName]) {
        validationRules[fieldName](fieldName);
      }
      this.isFormValid = this.validateForm();
    },
    validateEmail(fieldName) {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
      if (!emailRegex.test(this.formData[fieldName])) {
        this.errors[fieldName] = "Enter a valid email address";
      } else {
        this.errors[fieldName] = "";
      }
    },
    validatePassword(fieldName) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(this.formData[fieldName])) {
        this.errors[fieldName] =
          "The password must consist of 8 characters, including special characters, numbers, and both uppercase and lowercase letters.";
      } else {
        this.errors[fieldName] = "";
      }
    },
    validateForm() {
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== ""
      );
      this.isFormValid = !hasErrors;

      return !hasErrors;
    },
    submitForm() {
      if (this.validateForm()) {
        this.$emit("submitForm", { ...this.formData, id: Date.now() });
        this.resetForm();
      }
    },
    resetForm() {
      this.isFormValid = false;
      this.formData = {
        email: "",
        password: "",
      };
      this.errors = {};
    },
  },
};
</script>

<style scoped>
.content {
  background-color: #c1fff0;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.row {
  margin: 0 5px;
}
.form {
  background-color: #ffffff;
  padding: 30px;
  margin: 20px;
}
.avatar {
  max-width: 40%;
  aspect-ratio: 1/1;
  max-width: 200px;
  object-fit: cover;
}
.form-text {
  color: rgb(197, 0, 0);
}
</style>
