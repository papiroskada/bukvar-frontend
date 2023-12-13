import { createRouter, createWebHistory } from "vue-router";
import Registration from "@/pages/registration.vue";
import Home from "@/pages/home.vue";
import Login from "@/pages/login.vue";
import BooksCatalog from "@/pages/books.vue";
import FAQ from "@/pages/faq.vue";
import Author from "@/pages/author.vue";
import Profile from "@/pages/profile.vue";

/* eslint-disable */
const authGuard = (to, from, next) => {
    const isAuthorized = localStorage.hasOwnProperty('token');
    if (!isAuthorized) {
        next({ name: 'Login' });
    } else {
        next();
    }
};

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/books", name: "BooksCatalog", component: BooksCatalog, beforeEnter: authGuard },
  { path: "/faq", name: "FAQ", component: FAQ },
  { path: "/authors/:id", name: "Author", component: Author, beforeEnter: authGuard },
  { path: "/profile", name: "Profile", component: Profile, beforeEnter: authGuard },
  { path: "/registration", name: "Registration", component: Registration },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
