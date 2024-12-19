<template>
  <div class="home">
    <Hero />
    <Adv :adv="adv" />
    <ModelsGrid :models="brands" />
    <Slider title="Популярные модели авто" :cars="popularCars" id="popular" />
    <Action />
    <Slider
      title="Спецпредложения на покупку нового авто"
      :cars="promotionalCars"
      id="sales"
    />
    <Programs />
    <Trade :services="services" :topservices="topservices" />
    <Credit :credits="credits" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Credit from "../components/shared/Credit.vue";
import Slider from "../components/slider/Slider.vue";
import Programs from "../components/shared/Programs.vue";

// Blocks
import Hero from "../components/blocks/Hero.vue";
import Adv from "../components/blocks/Adv.vue";
import ModelsGrid from "../components/blocks/ModelsGrid.vue";
import Action from "../components/blocks/Action.vue";
import Trade from "../components/blocks/Trade.vue";
import { useCars } from "@/composables/useCars";
import { useHead } from "@unhead/vue";
import { adv, services, topservices, credits } from "@/data";
import { brands } from "@/data/brands";
const { useGetAll, popularCars, promotionalCars } = useCars();

// const adv = [
//   "Выгода до 20%<br/> на все модели",
//   "Без первоначального<br/> взноса",
//   "ТО или доп. оборудование<br/> в подарок",
// ];

// const services = [
//   {
//     icon: "car",
//     title: "Кэшбек на ТО",
//     txt: "Кешбек при покупке в кредит",
//   },
//   { icon: "casco", title: "Каско", txt: "В подарок при покупки в кредит" },
//   { icon: "cash", title: "Кешбек 100%", txt: "На 3 платежа по кредиту" },
//   {
//     icon: "card",
//     title: "Бонус",
//     txt: "Зимняя резина в подарок",
//   },
// ];
// const topservices = [
//   { title: "300 000", txt: "Выгода" },
//   { title: "КАСКО", txt: "В подарок" },
//   { title: "БЕСПЛАТНО", txt: "Оценка" },
// ];
// const credits = [
//   { title: "от 7%", txt: "Ставка по <br/>кредиту" },
//   { title: "1 час", txt: "Рассмотрение <br/>заявки" },
//   { title: "90%", txt: "Одобрение <br/>по кредиту" },
// ];

const updateSeo = () => {
  const title = `Купить новые автомобили`;
  const description = `Ознакомьтесь с нашим ассортиментом и выберите идеальный автомобиль. Удобные условия покупки, кредит и тест-драйв.`;

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  });
};

onMounted(() => {
  useGetAll(40);
  // useBrands();
  updateSeo();
});
</script>

<style scoped lang="scss"></style>
