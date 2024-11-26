<template>
  <div class="promo-slider">
    <div class="container">
      <div class="promo_slider">
        <Swiper
          :slides-per-view="1"
          :modules="[Navigation, Pagination]"
          :speed="700"
          :navigation="{
            prevEl: '.promo_prev',
            nextEl: '.promo_next',
          }"
          :pagination="{ el: '.promo-pagination', clickable: true }"
        >
          <SwiperSlide
            v-for="(item, i) in banners"
            :key="'promo-item-slide-' + i"
          >
            <div class="promo_slide">
              <div class="promo_slide__img">
                <img :src="item.img" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import { ref } from "vue";

const banners = ref<any>([
  {
    img: "",
    action: "",
  },
]);
</script>

<style scoped lang="scss"></style>
