<template>
  <div class="burger">
    <Close />
    <div class="header__logo_row">
      <RouterLink class="header__logo" to="/">
        <img src="/img/logo.png" />
      </RouterLink>
      <div class="header__logo_cta">
        <h2 class="header__logo_title">Технологии комфорта</h2>
        <div class="header__logo_descr">Строительство качественных домов</div>
      </div>
    </div>
    <ul class="header__nav_list">
      <li class="menu-item" v-for="(item, i) in menu" :key="'menu-item-' + i">
        <a :href="item.link">{{ item.name }}</a>
      </li>
    </ul>
    <div class="burger__contact">
      <a class="header__yandex" href="#">
        <div class="header__yandex_img">
          <img src="/img/yandex.png" />
        </div>
        На основании 50 отзывов</a
      >
      <ul class="header__social_list">
        <li
          class="header__social_item"
          v-for="(item, i) in socials"
          :key="'mobile-socials-item' + i"
        >
          <a class="header__social_link" :href="item.link" target="_blank">
            <img :src="item.img" />
          </a>
        </li>
      </ul>
      <a
        class="header__btn_calc btn_base_s js-popup-trigger-form"
        @click="openForm('price')"
        >Отправить проект на просчет</a
      >
      <div class="header__work_time">
        <div class="header__date">Без выходных 9:00-18:00</div>
        <a class="header__phone" href="#">+7 919 123 45 67</a
        ><a class="header__call_us" href="#" @click="openForm()"
          >Заказать звонок</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Close from "../ui/Close.vue";
import { useModalStore } from "@/stores/useModalStore";
const socials = ref([
  { img: "/img/tg.svg", link: "/" },
  { img: "/img/wa.svg", link: "/" },
  { img: "/img/email.svg", link: "/" },
]);

const menu = ref([
  { name: "Проекты и цены", link: "/" },
  { name: "Этапы строительства", link: "/" },
  { name: "О компании", link: "/" },
  { name: "Контакты", link: "/" },
  { name: "Отзывы", link: "/" },
]);

const { openModal, closeModal } = useModalStore();

const openForm = (mode?: string) => {
  closeModal("burger");
  openModal("form", mode);
};
</script>

<style scoped lang="scss">
.burger {
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  background-color: #fff;
  z-index: 101;
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 35rem;
  width: 100%;

  @media (max-width: 767px) {
    max-width: 100%;
    justify-content: center;
  }

  :deep(.header__social_list) {
    justify-content: center;
  }
  //   :deep(.header__logo_row) {
  //     justify-content: center;
  //   }
}

.burger__contact {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
}
</style>
