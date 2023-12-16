import { createRouter, createWebHistory } from "vue-router";
import Registration from "@/pages/registration.vue";
import Home from "@/pages/home.vue";
import Login from "@/pages/login.vue";
import BooksCatalog from "@/pages/books.vue";
import FAQ from "@/pages/faq.vue";
import Author from "@/pages/author.vue";
import Profile from "@/pages/profile.vue";
import Dashboard from "@/pages/Dashboard/dashboard.vue";
import DashboardAuthors from "@/pages/Dashboard/Authors/authors";
import DashboardUpdateAuthor from "@/pages/Dashboard/Authors/updateAuthor";
import DashboardAddAuthor from "@/pages/Dashboard/Authors/addAuthor";
import DashboardBooks from "@/pages/Dashboard/Books/books";
import DashboardUpdateBook from "@/pages/Dashboard/Books/updateBook";
import DashboardAddBook from "@/pages/Dashboard/Books/addBook";

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
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/dashboard/authors", name: "DashboardAuthors", component: DashboardAuthors },
  { path: "/dashboard/updateAuthors/:id", name: "DashboardUpdateAuthor", component: DashboardUpdateAuthor, props: true },
  { path: "/dashboard/addAuthor", name: "DashboardAddAuthor", component: DashboardAddAuthor },
  { path: "/dashboard/books", name: "DashboardBooks", component: DashboardBooks },
  { path: "/dashboard/updateBook/:id", name: "DashboardUpdateBook", component: DashboardUpdateBook, props: true },
  { path: "/dashboard/addBook", name: "DashboardAddBook", component: DashboardAddBook },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
