import { defineStore, storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

interface ModalsState {
  project: boolean;
  calc: boolean;
  form: boolean;
  burger: boolean;
}

export const useModalStore = defineStore("modal", {
  state: (): { modals: ModalsState; modalData: string } => ({
    modals: {
      project: false,
      calc: false,
      form: false,
      burger: false,
    },
    modalData: "",
  }),
  actions: {
    openModal(modalName: keyof ModalsState, data?: string) {
      this.modals[modalName] = true;
      if (data) {
        this.modalData = data; // Сохраняем переданные данные
      }
    },
    closeModal(modalName: keyof ModalsState) {
      const router = useRouter();
      const route = useRoute();

      this.modals[modalName] = false;
      this.modalData = ""; // Очищаем данные при закрытии

      // Проверяем, что route и query существуют
      if (modalName === "project" && route && route.query.project) {
        const { project, ...otherQueryParams } = route.query;
        router.replace({ query: { ...otherQueryParams } });
      }
    },
    closeAllModals() {
      const router = useRouter();
      const route = useRoute();

      Object.keys(this.modals).forEach((modalName) => {
        this.modals[modalName as keyof ModalsState] = false;
      });
      this.modalData = ""; // Очищаем данные всех модальных окон

      // Проверяем, что route и query существуют
      if (route && route.query.project) {
        const { project, ...otherQueryParams } = route.query;
        router.replace({ query: { ...otherQueryParams } });
      }
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
