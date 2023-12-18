<template>
  <div class="container">
    <Carousel />
    <div class="about mt-3">
      <h2 class="text-center">About us</h2>
      <p class="about-story">
        Welcome to our CRM platform tailored for book publishers, where
        efficiency meets creativity. Our system seamlessly integrates author
        management and bookkeeping, providing a comprehensive solution for the
        modern publishing industry. With our CRM, you can effortlessly navigate
        through author relationships, track book sales, and manage financial
        transactions, allowing you to focus on what matters most - bringing
        exceptional stories to the world. Join us on this journey of literary
        innovation and streamlined operations.
      </p>
    </div>
    <div v-if="checkUserToken == null" class="login">
      <div class="row">
        <div class="sign-in col-7"><LogIn /></div>
        <div class="sign-up col-3">
          <span class="new">New to bukVar?</span> <br />
          <router-link to="/registration">Create an account</router-link>
        </div>
      </div>
    </div>
    <div class="top-books mt-3">
      <TopBooks />
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import TopBooks from "@/components/top-books.vue";
  import Carousel from "@/components/carousel.vue";
  import LogIn from "@/components/log-form.vue";

  export default defineComponent({
    name: "HomeView",
    components: { LogIn, Carousel, TopBooks },
    data() {
      return {
        
      }
    },
    computed: {
        checkUserToken() {
            return localStorage.getItem('token');
        },
    },
  });
  // TopBooks,
</script>

<style scoped>
.container {
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}
.about {
  padding: 20px 0;
}
.login {
  margin: 10px 0;
}
.sign-in {
}
.about-story {
  margin: auto;
  width: 60%;
  text-align: center;
  font-size: 20px;
}
.top-books {
  max-width: 80%;
  margin: auto;
}
@media (max-width: 768px) {
  .about-story {
    font-size: 16px;
    width: 80%;
  }
}
</style>
