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
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Sign in</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

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

<script>
export default {
  name: "HeaderItem",
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleContactsMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
