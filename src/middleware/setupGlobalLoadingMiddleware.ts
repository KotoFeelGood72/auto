import { useLoading } from "@/composables/useLoading";

export default function setupGlobalLoadingMiddleware(router: any) {
  const { setLoading } = useLoading();

  router.beforeEach(async (to: any, from: any, next: any) => {
    if (to.path !== from.path) {
      setLoading(true); // Устанавливаем состояние загрузки
      await new Promise((resolve) => setTimeout(resolve, 600)); // Ждем 600 мс
    }
    next(); // Продолжаем переход
  });

  router.afterEach(async (to: any, from: any) => {
    if (to.path !== from.path) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLoading(false);
    }
  });
}
