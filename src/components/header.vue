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
              <router-link
                to="//books"
                class="nav-link active"
                aria-current="page"
                >Books</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/faq" class="nav-link">FAQ</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contacts" class="nav-link"
                >Contacts</router-link
              >
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
</style>
<script>
export default {
  name: "HeaderItem",
};
</script>
