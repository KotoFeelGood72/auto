<template>
  <header class="header js-header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__in">
      <div class="header__row">
        <div class="header__logo_row">
          <RouterLink class="header__logo" to="/">
            <img src="/img/logo.png" />
          </RouterLink>
          <div class="header__logo_cta">
            <h2 class="header__logo_title">Технологии комфорта</h2>
            <div class="header__logo_descr">
              Строительство качественных домов
            </div>
          </div>
        </div>
        <a class="header__yandex" href="#">
          <div class="header__yandex_img">
            <img src="/img/yandex.png" />
          </div>
          На основании 50 отзывов</a
        >
        <div class="header__contact">
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
            href="#"
            @click="openModal('form', 'price')"
            >Отправить проект на просчет</a
          >
          <div class="header__work_time">
            <div class="header__date">Без выходных 9:00-18:00</div>
            <a class="header__phone" href="#">+7 919 123 45 67</a
            ><a class="header__call_us" @click="openModal('form')"
              >Заказать звонок</a
            >
          </div>
        </div>
        <button
          class="header__menu_trigger js-header-menu-trigger"
          type="button"
          aria-label="Toggle menu"
          @click="openModal('burger')"
        >
          <span></span>
        </button>
      </div>
      <div class="header__row header__row--mobile">
        <nav class="header__nav">
          <div class="header__nav_in">
            <ul class="header__nav_list">
              <li
                class="menu-item"
                v-for="(item, i) in menu"
                :key="'menu-item-' + i"
              >
                <a :href="item.link">{{ item.name }}</a>
              </li>
            </ul>
            <div class="header__contact">
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
                  <a
                    class="header__social_link"
                    :href="item.link"
                    target="_blank"
                  >
                    <img :src="item.img" />
                  </a>
                </li>
              </ul>
              <a
                class="header__btn_calc btn_base_s js-popup-trigger-form"
                href="#"
                @click="openModal('form', 'price')"
                >Отправить проект на просчет</a
              >
              <div class="header__work_time">
                <div class="header__date">Без выходных 9:00-18:00</div>
                <a class="header__phone" href="tel:+79191234567"
                  >+7 919 123 45 67</a
                ><a class="header__call_us" href="#" @click="openModal('form')"
                  >Заказать звонок</a
                >
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useModalStore } from "@/stores/useModalStore";
const socials = ref([
  { img: "/img/tg.svg", link: "https://t.me/masternavse2" },
  { img: "/img/wa.svg", link: "https://wtsp.cc/79282755456" },
  { img: "/img/email.svg", link: "mailto:2klstk@mail.ru" },
]);

const menu = ref([
  { name: "Проекты и цены", link: "/" },
  { name: "Этапы строительства", link: "/" },
  { name: "О компании", link: "/" },
  { name: "Контакты", link: "/" },
  { name: "Отзывы", link: "/" },
]);

const isScrolled = ref(false);

const { openModal } = useModalStore();

const handleScroll = () => {
  // Если прокрутка больше, чем 50px, добавляем класс
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
.header {
  // background-color: #fff;
}
.header--scrolled {
  background-color: #ffffff52;
  backdrop-filter: blur(20px);
}
</style>
