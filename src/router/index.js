import { createRouter, createWebHistory } from "vue-router";
import Registration from "@/pages/registration.vue";
import Home from "@/pages/home.vue";
import Login from "@/pages/login.vue";
import BooksCatalog from "@/pages/books.vue";
import FAQ from "@/pages/faq.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/books", name: "BooksCatalog", component: BooksCatalog },
  { path: "/faq", name: "FAQ", component: FAQ },
  { path: "/registration", name: "Registration", component: Registration },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
