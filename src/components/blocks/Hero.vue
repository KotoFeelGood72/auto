<template>
  <section class="hero">
    <div class="section_in">
      <div class="row">
        <heading title="КУПИТЬ АВТО В МОСКВЕ" :size="40" class="title" />
        <heading
          title="Выгода до 40% на все модели в наличии"
          :level="2"
          :size="36"
          color="gradient"
          class="subtitle"
        />
        <btn
          name="Зафиксировать выгоду"
          color="gradient"
          styles="primary"
          size="large"
          class="mb-9"
          @click="openModal('sale')"
        />
        <timer />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useModalStore } from "@/stores/useModalStore";
import Btn from "../ui/btn.vue";
import heading from "../heading.vue";
import timer from "../ui/timer.vue";

const { openModal } = useModalStore();
</script>

<style scoped lang="scss">
.hero {
  background-image: url("/assets/img/changan.jpg");
  background-size: cover;
  background-position: top 70% center;
  background-repeat: no-repeat;
  color: $white;
  position: relative;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    content: "";
    height: 100%;
    background: linear-gradient(to right, #14141483, #ffffff2d);
    @include bp($point_2, $direction: min) {
      display: none;
    }
  }
}

.row {
  padding: 6rem 0 11.2rem 0;
  max-width: 67.5rem;
  @include bp($point_2) {
    max-width: 80%;
  }
}

.title {
  margin-bottom: 1.2rem;
  position: relative;
  z-index: 22;
}
.subtitle {
  margin-bottom: 2rem;
  max-width: 60rem;
  position: relative;
  z-index: 22;
}
</style>
