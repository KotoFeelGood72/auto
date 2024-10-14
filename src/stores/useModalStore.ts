import { defineStore, storeToRefs } from "pinia";

interface ModalsState {
  project: boolean;
  calc: boolean;
  form: boolean;
}

export const useModalStore = defineStore("modal", {
  state: (): { modals: ModalsState; modalData: string } => ({
    modals: {
      project: false,
      calc: false,
      form: false,
    },
    modalData: "", // Строка для хранения переданных данных
  }),
  actions: {
    openModal(modalName: keyof ModalsState, data?: string) {
      this.modals[modalName] = true;
      if (data) {
        this.modalData = data; // Сохраняем переданные данные
      }
    },
    closeModal(modalName: keyof ModalsState) {
      this.modals[modalName] = false;
      this.modalData = ""; // Очищаем данные при закрытии
    },
    closeAllModals() {
      Object.keys(this.modals).forEach((modalName) => {
        this.modals[modalName as keyof ModalsState] = false;
      });
      this.modalData = ""; // Очищаем данные всех модальных окон
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
