<template>
  <transition name="fade">
    <div class="preloader" v-if="isLoading">
      <div class="preloader_logo">
        <img src="/img/logo.png" />
      </div>
      <Icons icon="eos-icons:three-dots-loading" :size="70" class="spinner" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useLoadingStoreRefs } from "@/stores/useLoadingStore";

const { isLoading } = useLoadingStoreRefs();
</script>

<style scoped lang="scss">
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffffa9;
  z-index: 111;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #424242;
  opacity: 1;
  transition: opacity 0.5s ease;
  backdrop-filter: blur(2rem);
}

// .spinner {
//   animation: spin 1.5s linear infinite;
// }

.preloader_logo {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  //   width: 8rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

// @keyframes spin {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }

/* Переход для исчезновения/появления preloader */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0; /* Скрытие элемента */
}
</style>
