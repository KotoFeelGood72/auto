<template>
  <component :is="layoutComponent">
    <router-view />
    <transition name="fade-bg">
      <div v-if="isModalActive" class="page-bg" @click="closeAllModals"></div>
    </transition>
    <transition name="slide-up">
      <ModalCallback v-if="modals.form" />
    </transition>
    <transition name="slide-up">
      <ModalObject v-if="modals.project" />
    </transition>
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import ModalCallback from "./components/modals/ModalCallback.vue";
import ModalObject from "./components/modals/ModalObject.vue";
import { useRoute } from "vue-router";
import { useModalStoreRefs, useModalStore } from "./stores/useModalStore";

const isModalActive = computed(() => {
  return Object.values(modals.value).some((isActive) => isActive);
});

const route = useRoute();
const { closeAllModals } = useModalStore();
const { modals } = useModalStoreRefs();

const layoutComponent = computed(() => {
  switch (route.meta.layout) {
    case "default":
      return DefaultLayout;
    case "empty":
      return EmptyLayout;
    default:
      return DefaultLayout;
  }
});

watch(
  () => route.fullPath,
  () => {
    closeAllModals();
  }
);
</script>

<style lang="scss">
.page-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* затемнённый фон */
  z-index: 99;
}

/* Анимация появления фона */
.fade-bg-enter-active,
.fade-bg-leave-active {
  transition: opacity 0.3s ease;
}
.fade-bg-enter,
.fade-bg-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(10rem);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Стили для модального окна (если требуется) */
.modal {
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
