import { createRouter, createWebHistory } from "vue-router";
import setupGlobalLoadingMiddleware from "@/middleware/setupGlobalLoadingMiddleware";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL_ASSET),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 100, // Высота хедера для отступа
        behavior: "smooth", // Плавная прокрутка
      };
    }

    // Если сохранена позиция (например, при нажатии "назад/вперёд"), восстанавливаем её
    if (savedPosition) {
      return savedPosition;
    }

    // По умолчанию всегда прокручиваем к верху страницы
    return { top: 0, behavior: "smooth" };
  },

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/index.vue"),
    },
    {
      path: "/privacy/",
      name: "privacy",
      component: () => import("../pages/PrivacyPage.vue"),
    },
    {
      path: "/loan-terms/",
      name: "loan-terms",
      component: () => import("../pages/LoanTermsPage.vue"),
    },
    {
      path: "/about-user-agree/",
      name: "about-user-agree",
      component: () => import("../pages/AboutUserAgree.vue"),
    },
    {
      path: "/auto/",
      name: "auto",
      component: () => import("../pages/cars/CarsPage.vue"),
    },
    {
      path: "/auto/:brandSlug/",
      name: "brand-slug",
      component: () => import("../pages/cars/brandSlug.vue"),
    },
    {
      path: "/auto/:brandSlug/:modelSlug/",
      name: "model-slug",
      component: () => import("../pages/cars/modelSlug.vue"),
    },
  ],
});
setupGlobalLoadingMiddleware(router);

export default router;
