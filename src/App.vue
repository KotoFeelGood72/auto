<template>
  <component :is="layoutComponent">
    <transition name="fade-bg">
      <Preloader />
    </transition>
    <transition name="slide-up">
      <ModalCallback v-if="modals.form" />
    </transition>
    <transition name="slide-up">
      <ModalObject v-if="modals.project" />
    </transition>
    <transition name="slide-up">
      <ModalSale v-if="modals.sale" />
    </transition>
    <transition name="slide-right">
      <ModalBurger v-if="modals.burger" />
    </transition>
    <RouterView />
    <snow />
  </component>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import ModalCallback from "./components/modals/ModalCallback.vue";
import ModalObject from "./components/modals/ModalObject.vue";
import ModalBurger from "./components/modals/ModalBurger.vue";
import { useRoute } from "vue-router";
import { useModalStoreRefs, useModalStore } from "./stores/useModalStore";
import { useCloserModal } from "./composables/useCloserModal";
import Preloader from "./components/Preloader.vue";
import ModalSale from "./components/modals/ModalSale.vue";

// @ts-ignore
import snow from "./components/promo/snow.vue";

const { openModal } = useModalStore();
const { modals } = useModalStoreRefs();

const { allCloserModal } = useCloserModal();

let isModalShownByScroll = false; // Флаг для отслеживания показа модального окна при скролле

// Определяем, какой layout использовать
const route = useRoute();
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

// Определение, активны ли модальные окна
const isModalActive = computed(() => {
  return Object.values(modals.value).some((isActive) => isActive);
});

// Закрытие всех модальных окон при изменении маршрута
watch(
  () => route.path,
  () => {
    allCloserModal();
  }
);

// Добавление класса is_fixed к body при открытых модальных окнах
watch(isModalActive, (newValue) => {
  if (newValue) {
    document.body.classList.add("is_fixed");
  } else {
    document.body.classList.remove("is_fixed");
  }
});

// Функция для открытия модального окна при скролле
const handleScroll = () => {
  if (!isModalActive.value && !isModalShownByScroll) {
    // Проверяем, нет ли активных модальных окон и не была ли модалка показана ранее
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition / pageHeight >= 0.9) {
      openModal("form");
      isModalShownByScroll = true; // После показа модалки устанавливаем флаг в true
    }
  }
};

let inactivityTimer: ReturnType<typeof setTimeout>;

// Функция для сброса таймера бездействия
const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer);
  if (!isModalActive.value) {
    // Проверяем, нет ли активных модальных окон
    inactivityTimer = setTimeout(() => {
      openModal("form");
    }, 120000); // 60 секунд бездействия
  }
};

// Добавляем слушатели для отслеживания активности пользователя
const addInactivityListeners = () => {
  window.addEventListener("mousemove", resetInactivityTimer);
  window.addEventListener("keydown", resetInactivityTimer);
  window.addEventListener("scroll", resetInactivityTimer);
};

// Убираем слушатели активности
const removeInactivityListeners = () => {
  window.removeEventListener("mousemove", resetInactivityTimer);
  window.removeEventListener("keydown", resetInactivityTimer);
  window.removeEventListener("scroll", resetInactivityTimer);
};

// Обработчики событий при монтировании и размонтировании компонента
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  resetInactivityTimer();
  addInactivityListeners();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  removeInactivityListeners();
  clearTimeout(inactivityTimer);
});
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

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-5rem);
  opacity: 0;
}

.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.year-cap {
  position: relative;
  &:after {
    position: absolute;
    top: -0.5rem;
    left: -3.3rem;
    width: 8rem;
    height: 8rem;
    content: "";
    background-image: url("./assets/new-year/cap_5.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
}

.sky {
  height: 100%;
  color: #fff;
  display: block;
}
</style>
