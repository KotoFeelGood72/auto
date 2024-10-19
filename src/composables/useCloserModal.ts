import { useModalStore } from "@/stores/useModalStore";
import { useRoute, useRouter } from "vue-router";

export function useCloserModal() {
  const route = useRoute();
  const router = useRouter();
  const { closeAllModals } = useModalStore();
  function allCloserModal() {
    closeAllModals();
    if (route && route.query.project) {
      const { project, ...otherQueryParams } = route.query;
      router.replace({ query: { ...otherQueryParams } });
    }
  }

  return {
    allCloserModal,
  };
}
