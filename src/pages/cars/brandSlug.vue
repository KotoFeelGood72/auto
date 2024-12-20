<template>
  <div class="shop">
    <div class="shop-grid">
      <ModelsGrid :models="brands" />
      <div class="section_in">
        <div class="grid">
          <AutoCard v-for="item in filteredCars" :key="item.id" :card="item" />
        </div>
        <div class="loading" v-if="isLoading">
          <Icons icon="svg-spinners:ring-resize" :size="18" />
          <p>Загрузка...</p>
        </div>
        <div ref="scrollTrigger" class="scroll-trigger"></div>
      </div>
    </div>
    <Slider
      title="Спецпредложения на покупку нового авто"
      :cars="promotionalCars"
      id="cars-pages"
    />
    <Programs />
    <Trade :services="services" :topservices="topservices" />
    <Credit :credits="credits" />
  </div>
</template>

<script setup lang="ts">
import AutoCard from "@/components/card/AutoCard.vue";
import ModelsGrid from "@/components/blocks/ModelsGrid.vue";
import { useCars } from "@/composables/useCars";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { adv, services, topservices, credits } from "@/data";
import Slider from "@/components/slider/Slider.vue";
import Programs from "@/components/shared/Programs.vue";
import Credit from "@/components/shared/Credit.vue";
import Trade from "@/components/blocks/Trade.vue";
import { brands } from "@/data/brands";
const route = useRoute();
const {
  useGetAll,
  filteredCars,
  // taxs,
  selectedBrand,
  filterByBrand,
  // useBrands,
  isLoading,
  loadMoreCars,
  promotionalCars,
} = useCars();

const scrollTrigger = ref<HTMLElement | null>(null); // Реф для триггера
let observer: IntersectionObserver | null = null;

onMounted(async () => {
  await useGetAll();
  updateSeo();
  // useBrands();
  filterByBrand(route.params.brandSlug as any);
  // Инициализация Intersection Observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoading.value) {
        console.log("Trigger visible - loading more cars...");
        loadMoreCars();
      }
    });
  });

  // Наблюдаем за триггером
  if (scrollTrigger.value) {
    observer.observe(scrollTrigger.value);
  }
});

onUnmounted(() => {
  if (observer && scrollTrigger.value) {
    observer.unobserve(scrollTrigger.value);
  }
});

const updateSeo = () => {
  const brandName: any = selectedBrand?.value || "Все автомобили";
  const title = `${brandName} - Купить новые автомобили ${brandName}`;
  const description = `Ознакомьтесь с нашим ассортиментом ${brandName} и выберите идеальный автомобиль. Удобные условия покупки, кредит и тест-драйв.`;

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

watch(
  () => selectedBrand.value,
  (newBrandSlug) => {
    console.log(selectedBrand);
    filterByBrand(newBrandSlug as string);
    updateSeo();
  }
);

// watch(
//   () => route.params.brandSlug,
//   (newBrandSlug) => {
//     if (newBrandSlug) {
//       filterByBrand(newBrandSlug as string);
//     } else {
//       filterByBrand(null);
//     }
//     updateSeo();
//   }
// );
</script>

<style scoped lang="scss">
.shop-grid {
  padding: 6rem 0;
  @include bp($point_2) {
    padding-top: 4rem;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
  grid-gap: 2rem;
  margin-bottom: 4rem;
  @include bp($point_2) {
    grid-gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(47%, 1fr));
  }
}

.pagination-list {
  @include flex-start;
  gap: 1rem;
  li {
    width: 4rem;
    height: 4rem;
    @include flex-center;
    font-size: 1.8rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: all 0.3s ease-in-out;
    @include bp($point_2) {
      width: 3rem;
      height: 3rem;
      font-size: 1.6rem;
    }
    &:hover {
      background-color: #e0e0e0;
    }
    &.active {
      background-color: $primary;
      color: $white;
    }
  }
}

.pagination {
  @include flex-start;
  gap: 2rem;
  @include bp($point_2) {
    justify-content: center;
  }
}

.nav-btn {
  width: 4rem;
  height: 4rem;
  @include flex-center;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  background-color: #e0e0e0;
  @include bp($point_2) {
    width: 3rem;
    height: 3rem;
    font-size: 1.6rem;
  }

  &:hover:not(.disabled) {
    background-color: $primary;
    color: $white;
  }

  &.disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
}

.loading {
  @include flex-center;
  gap: 1rem;
  font-size: 1.8rem;
}
</style>
