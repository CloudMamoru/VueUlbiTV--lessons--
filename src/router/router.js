import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import { createRouter, createWebHistory } from "vue-router";

// Массив маршрутов
const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/about",
    component: About,
  },
];

// Сам Router
const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
