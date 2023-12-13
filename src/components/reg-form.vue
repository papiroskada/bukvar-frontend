<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div
          class="col-sm-5 mx-auto form shadow-sm p-3 mb-5 bg-body-tertiary rounded"
        >
          <h2 class="text-center m-3">Registration</h2>
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
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                aria-describedby="usernameHelp"
                v-model="formData.username"
                @input="validateField('username')"
                placeholder="anton228"
              />
              <span class="form-text">{{ errors.username }}</span>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label"
                >First name and second name</label
              >
              <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="nameHelp"
                v-model="formData.name"
                @input="validateField('name')"
                placeholder="Anton Chaika"
              />
              <span class="form-text">{{ errors.name }}</span>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Phone number</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                name="phone"
                placeholder="+38(000)-000-00-00"
                v-mask="'+38(0##)-###-##-##'"
                v-model="formData.phone"
                @input="validateField('phone')"
              />
              <span class="form-text">{{ errors.phone }}</span>
            </div>
            <div class="mb-3">
              <label for="birthdate" class="form-label">Birth date</label>
              <input
                type="date"
                class="form-control"
                id="birthdate"
                aria-describedby="birthdateHelp"
                v-model="formData.birthdate"
                @input="validateField('birthdate')"
              />
              <span class="form-text">{{ errors.birthdate }}</span>
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
            <div class="mb-3">
              <label for="passwordConfirm" class="form-label"
                >Confirm password</label
              >
              <input
                type="password"
                class="form-control"
                id="passwordConfirm"
                aria-describedby="passwordConfirmHelp"
                v-model="formData.passwordConfirm"
                @input="validateField('passwordConfirm')"
                placeholder="**********"
              />
              <span class="form-text">{{ errors.passwordConfirm }}</span>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
              <button
                type="submit"
                class="btn custom-btn"
                :disabled="!isFormValid"
              >
                Sign in
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
//import axios from "axios";
import { AuthAPI } from "@/api/AuthAPI/authAPI";

export default {
  directives: { mask },
  data() {
    return {
      formData: {
        email: "",
        username: "",
        name: "",
        phone: "",
        birthdate: null,
        password: "",
        passwordConfirm: "",
      },
      errors: {},
      isFormValid: false,
      avatarSrc: require("@/assets/avatar.svg"),
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
    // handleAvatarChange(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       this.avatarSrc = reader.result;
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // },
    validateField(fieldName) {
      this.errors[fieldName] = "";

      const validationRules = {
        username: this.validateUsername,
        name: this.validateName,
        birthdate: this.validateBirthDate,
        email: this.validateEmail,
        phone: this.validateCellphone,
        password: this.validatePassword,
        passwordConfirm: this.validatePasswordConfirm,
      };

      if (validationRules[fieldName]) {
        validationRules[fieldName](fieldName);
      }
      this.isFormValid = this.validateForm();
    },
    validateName(fieldName) {
      const ukrainianLettersRegex = /^[A-Z][a-zA-Z]{1,} [A-Z][a-zA-Z]{1,}$/;
      if (!ukrainianLettersRegex.test(this.formData[fieldName])) {
        this.errors[
          fieldName
        ] = `Поле повинно бути написане англійською та починатися з великої літери.`;
      } else {
        this.errors[fieldName] = "";
      }
    },
    validateUsername(fieldName) {
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(this.formData[fieldName])) {
        this.errors[
          fieldName
        ] = `Поле повинно бути написане англійською та може містити цифри.`;
      } else {
        this.errors[fieldName] = "";
      }
    },
    validateBirthDate(fieldName) {
      const currentDate = new Date();
      const birthdate = new Date(this.formData[fieldName]);
      const age = Math.floor(
        (currentDate - birthdate) / (365.25 * 24 * 60 * 60 * 1000)
      );
      if (age < 18) {
        this.errors[fieldName] = "Вам має бути більше 18 років";
      } else {
        this.errors[fieldName] = "";
      }
    },
    validateEmail(fieldName) {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
      if (!emailRegex.test(this.formData[fieldName])) {
        this.errors[fieldName] = "Введіть коректний email";
      } else {
        this.errors[fieldName] = "";
      }
    },
    validateCellphone(fieldName) {
      const phoneNumber = this.formData[fieldName].replace(/\D/g, "");

      const phoneRegex = /^380\d{9}$/;
      if (!phoneRegex.test(phoneNumber)) {
        this.errors[fieldName] = "Невірний формат номеру телефону";
      } else {
        this.errors[fieldName] = "";
      }
    },
    validatePassword(fieldName) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(this.formData[fieldName])) {
        this.errors[fieldName] =
          "Пароль має складатись з 8 символів, в яких присутні спец. символи, цифри, англ. літери великого та малого регістрів.";
      } else {
        this.errors[fieldName] = "";
      }
    },
    validatePasswordConfirm(fieldName) {
      if (this.formData.password !== this.formData.passwordConfirm) {
        this.errors[fieldName] = "Паролі не співпадають";
      } else {
        this.errors[fieldName] = "";
      }
    },
    validateForm() {
      const isEmptyField = Object.keys(this.formData).some(
        (fieldName) => !this.formData[fieldName]
      );
      this.isFormValid = !isEmptyField;

      return !isEmptyField;
    },
    async submitForm() {
        try {
            if (this.validateForm()) {
                const requestData = {
                    username: this.formData.username,
                    name: this.formData.name,
                    email: this.formData.email,
                    password: this.formData.password,
                    phone: this.formData.phone,
                    birthdate: this.formData.birthdate,
                };

                const res = await AuthAPI.register(requestData);

                if (res && res.data) {
                    this.resetForm();
                    this.$router.push({name: 'Login'});
                }
            }
        } catch (err) {
            console.log(err);
        }
    },

    resetForm() {
      this.isFormValid = false;
      this.formData = {
        email: "",
        username: "",
        name: "",
        phone: "",
        birthdate: null,
        password: "",
        passwordConfirm: "",
      };
      this.errors = {};
      //this.avatarSrc = require("@/assets/avatar.svg");
    },
  },
};
</script>

<style scoped>
.content {
  background-color: rgb(217, 187, 157);
  margin-top: 0;
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
