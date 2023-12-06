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
                placeholder="**********"
              />
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
              <button
                type="submit"
                class="btn custom-btn"
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
        email: "",
        password: "",
      },
      errors: {
        email: "",
      },
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
        email: this.validateEmail,
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

    validateForm() {
      const emailIsValid = this.validateEmail("email");

      const emailIsRequired = this.formData.email.trim() !== "";
      const passwordIsRequired = this.formData.password.trim() !== "";

      const isEmailValid = emailIsRequired && emailIsValid;
      const isPasswordValid = passwordIsRequired;

      return isEmailValid && isPasswordValid;
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
      this.errors = {
        email: "",
        password: "",
      };
    },
  },
};
</script>

<style scoped>
.content {
  background-color: rgb(217, 187, 157);
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
.custom-btn:disabled {
  border: 1px solid rgb(193, 136, 80);
  background-color: rgb(255, 255, 255);
  color: rgb(112, 81, 50);
}
.custom-btn {
  background-color: rgb(193, 136, 80);
  color: #ffffff;
}
.form-text {
  color: rgb(197, 0, 0);
}
</style>
