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
      component: () => import("../pages/index.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("../pages/privacy.vue"),
    },
    {
      path: "/loan-terms",
      name: "loan-terms",
      component: () => import("../pages/loan-terms.vue"),
    },
    {
      path: "/about-user-agree",
      name: "about-user-agree",
      component: () => import("../pages/about-user-agree.vue"),
    },
    {
      path: "/cars",
      name: "cars",
      component: () => import("../pages/cars/index.vue"),
    },
    {
      path: "/cars/:brandSlug",
      name: "brand-slug",
      component: () => import("../pages/cars/brandSlug.vue"),
    },
    {
      path: "/cars/:brandSlug/:modelSlug",
      name: "model-slug",
      component: () => import("../pages/cars/modelSlug.vue"),
    },
  ],
});

export default router;
