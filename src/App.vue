<template>
  <div class="content">
    <Header v-if="!isAuthPage"/>
    <router-view></router-view>
    <Footer v-if="!isAuthPage"/>
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
    };
  },
  components: {Header, Footer},
  watch: {
    $route(to) {
      this.isAuthPage = to.name === "Registration" || to.name === "Login";
    },
  },
});
</script>

<style>
body {
  font-family: "IBM Plex Serif", serif !important;
}
</style>
