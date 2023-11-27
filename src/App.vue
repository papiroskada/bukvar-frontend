<template>
  <div>
    <Header v-if="!isRegistrationPage" />
    <router-view></router-view>
    <Footer v-if="!isRegistrationPage" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default defineComponent({
  components: { Footer, Header },
  data() {
    return {
      isRegistrationPage: false,
    };
  },
  watch: {
    $route(to) {
      // Перевірка, чи поточний маршрут є сторінкою реєстрації
      this.isRegistrationPage = to.name === "Registration";
    },
  },
});
</script>


<style>
body {
  font-family: 'IBM Plex Serif', serif !important;
}
</style>
