import { createRouter, createWebHistory } from "vue-router";
import setupGlobalLoadingMiddleware from "@/middleware/setupGlobalLoadingMiddleware";
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Если переход на якорь (hash), прокручиваем с учётом хедера
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
      path: "/cars/",
      name: "cars",
      component: () => import("../pages/cars/CarsPage.vue"),
    },
    {
      path: "/cars/:brandSlug/",
      name: "brand-slug",
      component: () => import("../pages/cars/brandSlug.vue"),
    },
    {
      path: "/cars/:brandSlug/:modelSlug/",
      name: "model-slug",
      component: () => import("../pages/cars/modelSlug.vue"),
    },
  ],
});
setupGlobalLoadingMiddleware(router);

export default router;
