import { createRouter, createWebHistory } from "vue-router";
import Registration from "@/pages/registration.vue";
import Home from "@/pages/home.vue";
import Login from "@/pages/login.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/registration", name: "Registration", component: Registration },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
