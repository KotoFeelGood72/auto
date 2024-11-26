<template>
  <div v-if="!isCookieAccepted" class="note">
    <div class="coockie__img">
      <img
        src="http://2klstk.ru/wp-content/uploads/2024/11/cpnmhe6e7yadeae.webp"
      />
    </div>
    <p>
      Этот сайт использует cookie для хранения данных. Продолжая использовать
      сайт, Вы даете согласие на работу с этими файлами
    </p>
    <btn name="Принять" size="small" @click="acceptCookie" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import btn from "../ui/btn.vue";

const isCookieAccepted = ref(false);

// Проверяем, есть ли кука
onMounted(() => {
  isCookieAccepted.value = document.cookie.includes("cookieAccepted=true");
});

// Функция для принятия куки
const acceptCookie = () => {
  const currentDate = new Date().toUTCString(); // Получаем текущую дату в формате UTC
  document.cookie = `cookieAccepted=true; path=/; expires=Fri, 31 Dec 2024 23:59:59 GMT`;
  document.cookie = `cookieDate=${currentDate}; path=/; expires=Fri, 31 Dec 2024 23:59:59 GMT`;
  isCookieAccepted.value = true; // Скрываем сообщение
};
</script>

<style scoped lang="scss">
.note {
  @include flex-start;
  gap: 2rem;
  max-width: 55rem;
  background-color: #ffffff56;
  backdrop-filter: blur(1rem);
  font-size: 1.4rem;
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 102;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0 #0000001a;

  :deep(.btn) {
    @include bp($point_2) {
      font-size: 1rem;
      padding: 1rem 1.5rem;
    }
  }

  @include bp($point_2) {
    padding: 2rem 1rem;
    gap: 1rem;
    left: 2rem;
    // transform: translateX(-50%);
    width: calc(100% - 2rem);
    max-width: 30rem;
    backdrop-filter: blur(0);
    background-color: $white;
    bottom: 6rem;
    font-size: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }
}

.coockie__img {
  width: 5rem;
  min-width: 5rem;
  height: 5rem;
  @include flex-center;

  @include bp($point_2) {
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
