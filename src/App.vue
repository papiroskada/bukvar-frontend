<template>
  <div class="content">
    <Header v-if="!isAuthPage" />
    <router-view></router-view>
    <Footer v-if="!isAuthPage && !isDashboard" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default defineComponent({
  data() {
    return {
      isAuthPage: false,
      isDashboard: false,
    };
  },
  components: { Header, Footer },
  watch: {
    $route(to) {
      this.isAuthPage = to.name === "Registration" || to.name === "Login";
      this.isDashboard =
        to.name === "DashboardAuthors" ||
        to.name === "DashboardAddAuthor" ||
        to.name === "DashboardAuthors" ||
        to.name === "DashboardAddAuthor" ||
        to.name === "DashboardBooks" ||
        to.name === "DashboardUpdateBook" ||
        to.name === "DashboardAddBook";
    },
  },
});
</script>

<style>
body {
  font-family: "IBM Plex Serif", serif !important;
}
.btn-paginator {
  border: none !important;
  margin: 2px;
}
.btn-active {
  background-color: rgb(223, 223, 223);
}
</style>
