import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("../views/PolicyView.vue"),
    },
  ],
});

export default router;
