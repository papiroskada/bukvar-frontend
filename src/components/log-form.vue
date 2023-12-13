<template>
  <div class="content">
   <div class="container">
     <div class="row">
      <div class="col-sm-6 form shadow-sm p-3 bg-body-tertiary rounded">
        <form @submit.prevent="submitForm">
         <div class="mb-3">
           <label for="username" class="form-label">Username</label>
           <input
            type="text"
            class="form-control"
            id="username"
            v-model="formData.username"
            @input="validateField('username')"
            placeholder="example@ex.com"
           />
           <span class="form-text">{{ errors.username }}</span>
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
           <!-- <span class="form-text">{{ errors.password }}</span> -->
         </div>
         <div class="d-grid gap-2 col-6 mx-auto">
           <button type="submit" :disabled="!isFormValid" class="btn custom-btn">Log in</button>
         </div>
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

export default {
  data() {
   return {
        formData: {
            username: "",
            password: "",
        },
        errors: {
            username: "",
            password: ""
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
            username: this.validateUsername,
            password: this.validatePassword
        };

        if (validationRules[fieldName]) {
            validationRules[fieldName](fieldName);
        }

        this.isFormValid = this.validateForm();
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
    validatePassword(fieldName) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(this.formData[fieldName])) {
        this.errors[fieldName] =
          "Пароль має складатись з 8 символів, в яких присутні спец. символи, цифри, англ. літери великого та малого регістрів.";
      } else {
        this.errors[fieldName] = "";
      }
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
                const res = await AuthAPI.login(this.formData.username, this.formData.password);

                if (res && res.data) {
                    localStorage.setItem('token', res.data.token);
                    DefaultAPIInstance.defaults.headers['authorization'] = `Bearer ${res.data.token}`;
                    //const user = await UsersAPI.user()
                    //have to put userRole to localStorage
                    this.$router.push({name: 'Profile'});
                    this.resetForm();
                }
            }
        } catch (err) {
            console.log(err)
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
  margin-left: auto;
  margin-right: 0;
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
