<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="form shadow-sm p-3 bg-body-tertiary rounded">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @input="validateField('username')"
                placeholder="anton228"
              />
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
              </div>
            <div class="d-grid gap-2 col-6 mx-auto">
              <button
                type="submit"
                :disabled="!isFormValid"
                class="btn custom-btn"
              >
                Log in
              </button>
            </div>
            <span class="form-text">{{ errors.submit }}</span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthAPI } from "@/api/AuthAPI/authAPI";
//import { UsersAPI } from "@/api/UsersAPI/usersAPI";
import { DefaultAPIInstance } from "@/api";
import { getUserInfo } from "../common/decodeJWT";

export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      errors: {
        username: "",
        password: "",
        submit: "",
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
      this.isFormValid = this.validateForm();
    },

    validateForm() {
      const nameIsRequired = this.formData.username.trim() !== "";
      const passwordIsRequired = this.formData.password.trim() !== "";

      const isNameValid = nameIsRequired && this.errors.username == "";
      const isPasswordValid = passwordIsRequired && this.errors.password == "";

      this.isFormValid = isNameValid && isPasswordValid;
      return this.isFormValid;
    },
    async submitForm() {
      try {
        if (this.validateForm()) {
          if (localStorage.getItem("token") == null) {
            const res = await AuthAPI.login(
              this.formData.username,
              this.formData.password
            );

            if (res && res.data) {
              const token = res.data.token;

              localStorage.setItem("token", token);
              DefaultAPIInstance.defaults.headers[
                "authorization"
              ] = `Bearer ${token}`;

              const { userRole } = getUserInfo(token);
              localStorage.setItem("userRole", userRole);

              this.$router.push({ name: "Home" });
              if (window.location.pathname !== "/login") {
                this.$router.go();
              }
              this.resetForm();
            }
          } else {
            this.errors.submit = "You are already logged in";
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    resetForm() {
      this.isFormValid = false;
      this.formData = {
        username: "",
        password: "",
      };
      this.errors = {
        username: "",
        password: "",
      };
    },
  },
};
</script>

<style scoped>
.form {
  background-color: #ffffff;
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
