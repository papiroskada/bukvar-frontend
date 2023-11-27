<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div
          class="col-sm-5 mx-auto form shadow-sm p-3 mb-5 bg-body-tertiary rounded"
        >
          <form @submit.prevent="submitForm">
            <img
              :src="avatarSrc"
              class="avatar mx-auto d-block mb-3 rounded-circle"
              alt="аватар"
            />
            <div class="input-group mb-3">
              <input
                type="file"
                class="form-control"
                id="avatar"
                accept="image/*"
                @change="handleAvatarChange"
              />
              <label class="input-group-text" for="avatar">Завантажити</label>
            </div>
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
              <label for="username" class="form-label">Юзернейм</label>
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
              <label for="name" class="form-label">Ім'я</label>
              <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="nameHelp"
                v-model="formData.name"
                @input="validateField('name')"
                placeholder="Антон"
              />
              <span class="form-text">{{ errors.name }}</span>
            </div>
            <div class="mb-3">
              <label for="surname" class="form-label">Призвіще</label>
              <input
                type="text"
                class="form-control"
                id="surname"
                aria-describedby="surnameHelp"
                v-model="formData.surname"
                @input="validateField('surname')"
                placeholder="Чайка"
              />
              <span class="form-text">{{ errors.surname }}</span>
            </div>
            <div class="mb-3">
              <label for="middleName" class="form-label">По батькові</label>
              <input
                type="text"
                class="form-control"
                id="middleName"
                aria-describedby="middleNameHelp"
                v-model="formData.middleName"
                @input="validateField('middleName')"
                placeholder="Павлович"
              />
              <span class="form-text">{{ errors.middleName }}</span>
            </div>
            <div class="mb-3">
              <label for="cellphone" class="form-label">Номер телефону</label>
              <input
                type="tel"
                class="form-control"
                id="cellphone"
                name="cellphone"
                placeholder="+38(000)-000-00-00"
                v-mask="'+38(0##)-###-##-##'"
                v-model="formData.cellphone"
                @input="validateField('cellphone')"
              />
              <span class="form-text">{{ errors.cellphone }}</span>
            </div>
            <div class="mb-3">
              <label for="birthDate" class="form-label">Дата народження</label>
              <input
                type="date"
                class="form-control"
                id="birthDate"
                aria-describedby="birthDateHelp"
                v-model="formData.birthDate"
                @input="validateField('birthDate')"
              />
              <span class="form-text">{{ errors.birthDate }}</span>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Пароль</label>
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
              <label for="passwordConfirm" class="form-label">Пароль</label>
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

            <div class="mb-3">
              <p class="fs-6">Обери стать</p>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  v-model="formData.gender"
                  @input="validateField('gender')"
                />
                <label class="form-check-label" for="male"> Чоловіча </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                  v-model="formData.gender"
                  @input="validateField('gender')"
                />
                <label class="form-check-label" for="female"> Жіноча </label>
              </div>
              <span class="form-text">{{ errors.gender }}</span>
            </div>
            <div class="mb-3">
              <select class="form-select" v-model="formData.role">
                <option value="0">Обери роль</option>
                <option value="1">Власник</option>
                <option value="2">Адмін</option>
                <option value="3">Користувач</option>
              </select>
              <span class="form-text">{{ errors.role }}</span>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
              <button
                type="submit"
                class="btn btn-outline-success"
                :disabled="!isFormValid"
              >
                Зареєструватись
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
        username: "",
        name: "",
        surname: "",
        middleName: "",
        cellphone: "",
        birthDate: null,
        password: "",
        passwordConfirm: "",
        gender: null,
        role: 0,
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
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.avatarSrc = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    validateField(fieldName) {
      this.errors[fieldName] = "";

      const validationRules = {
        username: this.validateUsername,
        name: this.validateName,
        surname: this.validateName,
        middleName: this.validateName,
        birthDate: this.validateBirthDate,
        email: this.validateEmail,
        cellphone: this.validateCellphone,
        gender: this.validateGender,
        role: this.validateRole,
        password: this.validatePassword,
        passwordConfirm: this.validatePasswordConfirm,
      };

      if (validationRules[fieldName]) {
        validationRules[fieldName](fieldName);
      }
      this.isFormValid = this.validateForm();
    },
    validateName(fieldName) {
      const ukrainianLettersRegex =
        /^([А-ЯІЇЄҐ'’][а-яіїєґ'’]{1,})([А-ЯІЇЄҐ'’][а-яіїєґ'’]*|-?[А-ЯІЇЄҐ'’][а-яіїєґ'’]*)?$/;
      if (!ukrainianLettersRegex.test(this.formData[fieldName])) {
        this.errors[
          fieldName
        ] = `Поле повинно бути написане українською та починатися з великої літери.`;
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
      const birthDate = new Date(this.formData[fieldName]);
      const age = Math.floor(
        (currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000)
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
    validateRole(fieldName) {
      if (this.formData[fieldName] === 0) {
        this.errors[fieldName] = "Оберіть роль";
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
        username: "",
        name: "",
        surname: "",
        middleName: "",
        cellphone: "",
        birthDate: null,
        password: "",
        passwordConfirm: "",
        gender: null,
        role: 0,
      };
      this.errors = {};
      this.avatarSrc = require("@/assets/avatar.svg");
    },
  },
};
</script>

<style scoped>
.content {
  background-color: #c1fff0;
  margin-top: 0;
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
