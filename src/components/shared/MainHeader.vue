<template>
  <header class="header js-header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__in">
      <div class="header__row">
        <div class="header__logo_row">
          <RouterLink class="header__logo" to="/">
            <img src="https://2klstk.ru/wp-content/uploads/2024/09/logo.png" />
          </RouterLink>
          <div class="header__logo_cta">
            <h2 class="header__logo_title">Технологии комфорта</h2>
            <div class="header__logo_descr">
              Строительство качественных домов
            </div>
          </div>
        </div>
        <YandexStar />
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
          <btn
            name="Отправить проект на просчет"
            :caps="5"
            @click="openModal('form', 'price')"
          />
          <div class="header__work_time">
            <div class="header__date">Без выходных 9:00-18:00</div>
            <a class="header__phone" href="tel:+79282755456">+7 928 275-54-56</a
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
      <ul class="header__nav_list">
        <li class="menu-item" v-for="(item, i) in menu" :key="'menu-item-' + i">
          <a :href="item.link">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
import { ref, onMounted, onUnmounted } from "vue";
import YandexStar from "../promo/YandexStar.vue";

import { useModalStore } from "@/stores/useModalStore";
const socials = ref([
  {
    img: "https://2klstk.ru/wp-content/themes/comfort/assets/images/contact/telegram.svg",
    link: "https://t.me/masternavse2",
  },
  {
    img: "https://2klstk.ru/wp-content/themes/comfort/assets/images/contact/whatsapp.svg",
    link: "https://wtsp.cc/79282755456",
  },
  {
    img: "https://2klstk.ru/wp-content/themes/comfort/assets/images/contact/mail-social.svg",
    link: "mailto:2klstk@mail.ru",
  },
]);

const menu = ref([
  { name: "Проекты и цены", link: "/#projects" },
  { name: "Этапы строительства", link: "/#steps" },
  { name: "О компании", link: "/#about" },
  { name: "Контакты", link: "/#contacts" },
  { name: "Отзывы", link: "/#reviews" },
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
  background-color: #ffffffc2;
  overflow: hidden;
  .header__in {
    position: relative;
    z-index: 2;
  }
}
.header--scrolled {
  backdrop-filter: blur(0.5rem);
}

.header__btn_calc {
  @media (min-width: 1372px) and (max-width: 1500px) {
    font-size: 1.8rem;
  }

  @media (max-width: 1372px) {
    display: none;
  }
}

.header__social_item {
  @media (max-width: 1500px) {
    width: 4rem;
    height: 4rem;
  }
}

.header__contact {
  @include flex-start;
  gap: 2rem;
}

.header__social_list {
  @include bp($point_1) {
    display: none;
  }
}

.header__nav_list {
  font-size: 2rem;
  padding: 1rem 0;
}

.header__logo {
  position: relative;
}

.header__in {
  position: relative;
}

.header__row {
  // background-color: #ffffff8f;

  :deep(.yandex-star) {
    @include bp($point_1) {
      display: none;
    }
  }
  @include bp($point_1) {
    gap: 1rem;
  }

  .btn {
    @include bp($point_1) {
      display: none;
    }
  }

  @include bp($point_2) {
    @include flex-start;
    height: 100%;
  }
}

.header__in {
  @include bp($point_2) {
    height: 100%;
  }
}

.header__date,
.header__call_us {
  @include bp($point_1) {
    display: none;
  }
}

.header__logo_row {
  @include bp($point_1) {
    margin-right: 0;
  }
}

.header__phone {
  @include bp($point_1) {
    // font-size: 1.6rem;
    margin: 0;
  }
}

.header__logo_cta {
  @include bp($point_2) {
    display: none;
  }
}

.header__nav_list {
  @include bp($point_2) {
    display: none;
  }
}
</style>
