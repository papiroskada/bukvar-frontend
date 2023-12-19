<template>
  <div class="content">
    <div class="container">
      <h2 class="m-lg-3 text-center">Hello, {{ user.name }}</h2>
      <router-link :to="{ name: 'ProfileUpdate' }" class="btn custom-btn"
        >Update Information</router-link
      >
      <hr />
      <table class="table">
        <tr>
          <td class="fw-bold">Name:</td>
          <td>{{ user.name }}</td>
        </tr>
        <tr>
          <td class="fw-bold">Username:</td>
          <td>{{ user.username }}</td>
        </tr>
        <tr>
          <td class="fw-bold">Email:</td>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <td class="fw-bold">Cellphone:</td>
          <td>{{ user.phone }}</td>
        </tr>
        <tr>
          <td class="fw-bold">Birth date:</td>
          <td>{{ formatDate(user.birthdate) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getUserInfo } from "@/common/decodeJWT";
import { UsersAPI } from "@/api/UsersAPI/usersAPI";
import { formatDate } from "../common/formatDate";

export default defineComponent({
  name: "UserProfile",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
  },
  async mounted() {
    const { userId } = getUserInfo(localStorage.getItem("token"));
    if (userId) {
      const res = await UsersAPI.user(userId);
      if (res && res.data) {
        this.user = { ...res.data };
      }
    }
  },
});
</script>

<style scoped>
body {
  font-family: "Your Preferred Font", sans-serif;
  color: #333; /* Adjust the color according to your design */
  background-color: #f8f9fa; /* Adjust the background color according to your design */
}
.btn {
  display: block;
  margin: auto;
  width: 250px;
}
.table {
  border-collapse: collapse;
  width: 40%;
  margin: 30px;
}
.table td {
  padding: 8px; /* Adjust the padding according to your design */
  border: none; /* Remove borders between td elements */
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

.container {
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  min-height: 82vh;
  overflow-y: auto;
}

h2 {
  font-size: 2.5em;
  color: #301800; /* Adjust the color according to your design */
}

hr {
  border: 1px solid #ccc; /* Adjust the color according to your design */
}

ul.info {
  list-style-type: none;
  font-size: 20px;
}

ul.info li {
  margin: 10px;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
  /* Add more responsive styles as needed */
}
</style>
