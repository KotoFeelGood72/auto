import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL_ASSET),
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (to.path === from.path && to.fullPath !== from.fullPath) {
      return null;
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
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
