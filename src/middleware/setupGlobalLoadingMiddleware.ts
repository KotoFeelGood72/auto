// // middleware/setupGlobalLoadingMiddleware.ts
// import { useLoadingStore } from "@/stores/useLoadingStore";
// import { getActivePinia } from "pinia";

// export default function setupGlobalLoadingMiddleware(router: any) {
//   router.beforeEach((to: any, from: any, next: any) => {
//     const pinia = getActivePinia();
//     const { setLoading } = useLoadingStore(pinia);

//     // Включаем прелоадер, только если изменился сам маршрут, а не query параметры
//     if (to.path !== from.path) {
//       setLoading(true);
//     }
//     next();
//   });

//   router.afterEach((to: any, from: any) => {
//     const pinia = getActivePinia();
//     const { setLoading } = useLoadingStore(pinia);

//     // Отключаем прелоадер, если изменился маршрут (но не query параметры)
//     if (to.path !== from.path) {
//       setTimeout(() => {
//         setLoading(false);
//       }, 500);
//     }
//   });
// }
