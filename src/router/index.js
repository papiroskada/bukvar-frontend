import { createRouter, createWebHistory } from "vue-router";
import Registration from "@/pages/registration.vue";
import Home from "@/pages/home.vue";
import Login from "@/pages/login.vue";
import BooksCatalog from "@/pages/books.vue";
import FAQ from "@/pages/faq.vue";
import AuthorInfo from "@/pages/authorInfo.vue";
import Profile from "@/pages/profile.vue";
import Dashboard from "@/pages/Dashboard/dashboard.vue";
import DashboardAuthors from "@/pages/Dashboard/Authors/authors";
import DashboardAddAuthor from "@/pages/Dashboard/Authors/addAuthor";
import DashboardBooks from "@/pages/Dashboard/Books/books";
import DashboardUpdateBook from "@/pages/Dashboard/Books/updateBook";
import DashboardAddBook from "@/pages/Dashboard/Books/addBook";
import BookInfo from '../pages/bookInfo.vue';
import ProfileUpdate from '../pages/profileUpdate.vue';

/* eslint-disable */
const authGuard = (to, from, next) => {
    const isAuthorized = localStorage.hasOwnProperty('token');
    if (!isAuthorized) {
        next({ name: 'Login' });
    } else {
        next();
    }
};

const isAuthorized = (to, from, next) => {
    const isAuthorized = localStorage.hasOwnProperty('token');
    if (isAuthorized) {
        next({ name: 'Home' });
    } else {
        next();
    }
};

const managerAuthGuard = (to, from, next) => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ROLE_ADMIN') {
        next({ name: 'Home' });
    } else {
        next();
    }
};

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login, beforeEnter: isAuthorized },
  { path: "/books", name: "BooksCatalog", component: BooksCatalog, beforeEnter: authGuard },
  { path: "/books/:id", name: "BookInfo", component: BookInfo, props: true, beforeEnter: authGuard },
  { path: "/faq", name: "FAQ", component: FAQ },
  { path: "/authors/:id", name: "AuthorInfo", component: AuthorInfo, beforeEnter: authGuard, props: true },
  { path: "/profile", name: "Profile", component: Profile, beforeEnter: authGuard },
  { path: "/profile/update", name: "ProfileUpdate", component: ProfileUpdate, beforeEnter: authGuard, props: true },
  { path: "/registration", name: "Registration", component: Registration, },
  { path: "/dashboard", name: "Dashboard", component: Dashboard, beforeEnter: managerAuthGuard },
  { path: "/dashboard/authors", name: "DashboardAuthors", component: DashboardAuthors, beforeEnter: managerAuthGuard },
  { path: "/dashboard/addAuthor", name: "DashboardAddAuthor", component: DashboardAddAuthor, beforeEnter: managerAuthGuard },
  { path: "/dashboard/books", name: "DashboardBooks", component: DashboardBooks, beforeEnter: managerAuthGuard },
  { path: "/dashboard/updateBook/:id", name: "DashboardUpdateBook", component: DashboardUpdateBook, props: true, beforeEnter: managerAuthGuard },
  { path: "/dashboard/addBook", name: "DashboardAddBook", component: DashboardAddBook, beforeEnter: managerAuthGuard },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
