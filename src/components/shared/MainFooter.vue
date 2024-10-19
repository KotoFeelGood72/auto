<template>
  <footer class="footer">
    <div class="footer__in">
      <div class="footer__row">
        <div class="footer__col footer__col--logo">
          <div class="footer__logo_row">
            <RouterLink class="footer__logo" to="/">
              <img
                src="https://2klstk.ru/wp-content/uploads/2024/09/logo.png"
              />
            </RouterLink>
            <div class="footer__logo_cta">
              <h2 class="footer__logo_title">Технологии комфорта</h2>
              <div class="footer__logo_descr">
                Строительство качественных домов
              </div>
            </div>
          </div>
          <div class="footer__row_icon">
            <span class="contact__icon">
              <Icons icon="clarity:envelope-solid" :size="30" /> </span
            ><a href="mailto:">komfort@gmail.com</a>
          </div>
          <div class="footer__row_icon">
            <span class="contact__icon">
              <Icons icon="rivet-icons:map-pin-solid" :size="30" /></span
            ><span>г. Краснодар, ул.Соколова, д. 66/2, офис 1</span>
          </div>
        </div>
        <div class="footer__col footer__col--info">
          <div class="footer__date">Без выходных 9:00-18:00</div>
          <a class="footer__phone" href="tel:+79191234567">+7 919 123 45 67</a
          ><a class="footer__call_us" @click="openModal('form')"
            >Заказать звонок</a
          >
          <ul class="footer__social_list">
            <li
              class="footer__social_item"
              v-for="(item, i) in socials"
              :key="'footer-social-item' + i"
            >
              <a class="footer__social_link" :href="item.link"
                ><img :src="item.img"
              /></a>
            </li>
          </ul>
        </div>
        <div class="footer__col footer__col--logo">
          <nav class="footer__nav">
            <ul class="footer__nav_list">
              <li
                class="menu-item"
                v-for="(item, i) in menu"
                :key="'footer-menu-item' + i"
              >
                <RouterLink :to="item.link">{{ item.name }}</RouterLink>
              </li>
            </ul>
          </nav>
          <div class="footer__rights_row">
            <div class="footer__rights_link_w">
              <RouterLink to="/privacy/" class="footer__politic">
                Политика конфиденциальности
              </RouterLink>

              <div class="footer__inn">ИНН 2311188415</div>
            </div>
            <!-- <div class="footer__studio_logo_w">
              <div class="footer__studio_img_w">
                <img
                  class="footer__studio_img"
                  src="@/assets/images/footer-studio.svg"
                />
              </div>
              <div class="footer__studio_logo_title">
                Разработчик <br />
                <strong>Happines</strong>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useModalStore } from "@/stores/useModalStore";

const { openModal } = useModalStore();
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
</script>

<style scoped lang="scss"></style>
