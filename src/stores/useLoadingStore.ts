import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false as boolean,
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value;
      console.log(this.isLoading);
    },
  },
});

export const useLoadingStoreRefs = () => storeToRefs(useLoadingStore());
