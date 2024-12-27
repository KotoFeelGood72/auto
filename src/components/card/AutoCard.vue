<template>
  <!-- <RouterLink
    :to="`/auto/${card?.terms?.brand[0].toLowerCase()}/${card.slug}`"
    class="card"
    v-if="isCardValid"
  > -->
  <div
    class="card"
    v-if="isCardValid"
    @click.prevent="
      openModal('car', {
        img: card.acf.main_img.url,
        title: 'Спецпредложение по кредиту',
        name: card.title,
        deal_mark: card?.terms?.brand[0].toLowerCase(),
        deal_model: card.title,
      })
    "
  >
    <div class="hot">{{ card.acf.sale ? card.acf.sale : "- 40%" }}</div>
    <div class="img">
      <img :src="card.acf.main_img.url" :alt="card.title" />
    </div>
    <div class="content">
      <heading :title="decodeHtml(card.title)" :size="24" class="title" />
      <div class="row">
        <div>
          <p class="price">{{ card.acf.new_price }}</p>
          <p class="old">{{ formattedOldPrice }}</p>
        </div>
        <div class="credit">{{ card.acf.monthly_payment }}</div>
      </div>
      <div class="btn-row">
        <btn
          name="TRADE-IN"
          size="normal"
          styles="secondary"
          color="blue"
          class="first-btn"
          @click.stop="
            openModal('car', {
              img: card.acf.main_img.url,
              title: 'Спецпредложение по TRADE-IN',
              name: card.title,
              deal_mark: card?.terms?.brand[0].toLowerCase(),
              deal_model: card.title,
            })
          "
        />
        <btn
          name="Купить в кредит"
          size="normal"
          styles="primary"
          color="blue"
          @click.stop="
            openModal('car', {
              img: card.acf.main_img.url,
              title: 'Спецпредложение по кредиту',
              name: card.title,
              deal_mark: card?.terms?.brand[0].toLowerCase(),
              deal_model: card.title,
            })
          "
        />
      </div>
    </div>
  </div>
  <!-- </RouterLink> -->
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
import heading from "../heading.vue";
import { computed } from "vue";
import { useModalStore } from "@/stores/useModalStore";

const props = defineProps<{
  card: any;
}>();

const { openModal } = useModalStore();
const isCardValid = computed(() => {
  return (
    props.card &&
    Object.keys(props.card).length > 0 &&
    props.card.slug &&
    props.card.acf.main_img.url &&
    props.card.title
  );
});

const formattedOldPrice = computed(() => {
  const priceString = props.card.acf.new_price; // Используем новую цену как базу
  if (!priceString) return "Цена не указана"; // Проверка на отсутствие значения

  const price = parseInt(priceString.replace(/[^0-9]/g, ""), 10); // Извлекаем только число
  if (!price || price <= 0) return "Цена не указана"; // Проверка на некорректное значение

  // Добавляем рандомное значение до 500,000
  const randomIncrease = Math.floor(Math.random() * 500000) + 1; // Генерация от 1 до 500,000
  const oldPrice = price + randomIncrease;

  // Форматируем старую цену
  return oldPrice.toLocaleString("ru-RU") + " ₽";
});

function decodeHtml(html: any) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
</script>

<style scoped lang="scss">
.card {
  border: 0.1rem solid $border;
  @include flex-start;
  flex-direction: column;
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: $white;
  &:hover {
    box-shadow: 0 0 1rem 0 #0000001c;
  }
}

.hot {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: $red;
  padding: 1rem 2rem;
  color: $white;
  border-radius: 1rem;
  @include bp($point_2) {
    top: 1rem;
    right: 1rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
}

.content {
  padding: 1.5rem;
  width: 100%;
  @include bp($point_2) {
    display: flex;
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;
    width: 100%;
  }
  .title {
    margin-bottom: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-height: 2.4rem;
    max-height: 3.6rem;
    @include bp($point_2) {
      min-height: auto;
      margin-bottom: 1rem;
    }
  }
  .row {
    @include flex-start;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 2rem;
    @include bp($point_2) {
      flex-direction: column;
      gap: 1rem;
    }
  }
  .credit {
    @include bp($point_2) {
      font-size: 1.4rem;
      color: $primary;
    }
  }
  .price {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }
  .old {
    color: $light;
    font-size: 1.6rem;
    text-decoration: line-through;
    font-weight: 500;
    @include bp($point_2) {
      font-size: 1.2rem;
    }
  }
}

.btn-row {
  gap: 1rem;
  @include flex-space;
  @include bp($point_2) {
    flex-direction: column;
  }
  :deep(.btn) {
    flex: 1;
    @include flex-center;
    @include bp($point_2) {
      width: 100%;
    }
  }
}

:deep(.heading-24) {
  @include bp($point_2) {
    font-size: 1.6rem;
  }
}

.img {
  padding: 4rem 0 2rem 0;
  height: 22rem;
  max-width: 30rem;
  // img {
  //   height: auto !important;
  // }
  @include bp($point_2) {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0;
  }
}

:deep(.first-btn) {
  @include bp($point_2) {
    display: none !important;
  }
}
</style>
