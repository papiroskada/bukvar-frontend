import { createApp } from "vue";
import App from "./App.vue";
import { router } from './router/index';
import "bootstrap/dist/css/bootstrap.css";
import "vue-awesome-paginate/dist/style.css";
import VueAwesomePaginate from 'vue-awesome-paginate';

createApp(App).use(router).use(VueAwesomePaginate).mount("#app");