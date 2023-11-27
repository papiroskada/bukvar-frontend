<template>
  <div>
    <nav class="navbar custom-navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand custom-link" href="#"
          >bukVar</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/books" class="nav-link custom-link" href="#"
                >Books</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/authors" class="nav-link custom-link" href="#"
                >Authors</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/faq" class="nav-link custom-link" href="#"
                >FAQ</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/contacts" class="nav-link custom-link" href="#"
                >Contacts</router-link
              >
            </li>
          </ul>
        </div>
        <div class="d-flex">
          <router-link to="/login" class="nav-link custom-link-auth" href="#"
            >Log in</router-link
          >
          <router-link
            to="/registration"
            class="nav-link custom-link-auth"
            href="#"
            >Sign in</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>
<style>
.custom-navbar {
  background-color: #e4fff8;
}
.custom-link {
  color: #007a93;
  font-weight: 500;
  font-size: 24px;
}
.custom-link-auth {
  font-size: 20px;
  color: #007a93;
}
.custom-link:hover {
  color: #009ebe;
}
</style>
<script>
export default {
  name: "HeaderItem",
};
</script>
