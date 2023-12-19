<template>
  <div>
    <nav class="navbar navbar-expand-lg custom-navbar">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">bukVar</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span><i class="fa-solid fa-bars"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/books" class="nav-link active"
                >Books</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/faq" class="nav-link">FAQ</router-link>
            </li>
            <li class="nav-item" v-on:click="toggleContactsMenu">
              <router-link to="" class="nav-link"
                >Contacts <i class="fa-solid fa-caret-down"></i
              ></router-link>
              <ul v-show="showMenu" class="submenu">
                <li>
                  <a href="tel:+380509431722">+38(050)-943-1722</a><br />
                  <p>manager Daria</p>
                </li>
                <li>
                  <a href="tel:+380959083943">+38(095)-908-3943</a><br />
                  <p>manager Anton</p>
                </li>
                <li>
                  <a href="mailto:bukVar@gmail.com">bukVar@gmail.com</a><br />
                  <p>email</p>
                </li>
              </ul>
            </li>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li v-if="checkUserRole == 'ROLE_ADMIN'" class="nav-item">
                <router-link to="/dashboard" class="nav-link"
                  >Dashboard</router-link
                >
              </li>
            </ul>
          </ul>

          <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li v-if="checkUserToken == null" class="nav-item">
              <router-link to="/login" class="nav-link">Sign in</router-link>
            </li>
            <div v-else class="d-flex">
              <li class="nav-item">
                <router-link @click="logout" to="/" class="nav-link"
                  >Logout</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/profile" class="nav-link"
                  >Profile</router-link
                >
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { DefaultAPIInstance } from "@/api";
import { getUserInfo } from "@/common/decodeJWT";

export default defineComponent({
  name: "HeaderItem",
  data() {
    return {
      showMenu: false,
      token: null,
    };
  },
  computed: {
    checkUserToken() {
      return this.token;
    },
    checkUserRole() {
      if (this.token) {
        const { userRole } = getUserInfo(this.token);
        return userRole;
      }
      return null;
    },
  },
  methods: {
    toggleContactsMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      delete DefaultAPIInstance.defaults.headers["authorization"];

      this.token = null;

      this.$router.push({ name: "Home" });
      if (window.location.pathname == "/") {
        this.$router.go();
      }
    },
  },
  created() {
    this.token = localStorage.getItem("token");
  },
});
</script>

<style>
.custom-navbar {
  background-color: rgb(193, 136, 80);
}

.submenu {
  display: none;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  padding: 10px 20px;
  z-index: 9999;
  border-radius: 3px;
}

.nav-item:hover .submenu,
.nav-item.active .submenu {
  display: block;
}

.submenu a {
  color: black;
}

.submenu a:hover {
  color: black;
}

.submenu p {
  color: rgb(65, 65, 65);
  font-size: 13px;
  padding: 0;
}
</style>
