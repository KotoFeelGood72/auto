<template>
  <div class="banner">
    <div class="section_in">
      <div class="banner_main">
        <div class="banner_content">
          <h1 class="banner_title">
            В новый год с новым домом от<br />
            <span>"Технологии Комфорта"</span>
          </h1>
          <p class="banner_subtitle">
            Зафиксируйте цену строительства до <span>28.12.2024</span> Начните
            новый год с мечты о собственном уютном доме!
          </p>
          <div class="banner_timer">
            <div class="timer_item">
              <span class="timer_value">{{ days }}</span>
              <span class="timer_label">Дней</span>
            </div>
            <div class="timer_item">
              <span class="timer_value">{{ hours }}</span>
              <span class="timer_label">Часов</span>
            </div>
            <div class="timer_item">
              <span class="timer_value">{{ minutes }}</span>
              <span class="timer_label">Минут</span>
            </div>
            <div class="timer_item">
              <span class="timer_value">{{ seconds }}</span>
              <span class="timer_label">Секунд</span>
            </div>
          </div>
          <btn
            name="Зафиксировать цену"
            theme="blue"
            size="large"
            :caps="5"
            @click="openModal('sale')"
          />
        </div>
        <div class="banner_img">
          <img src="http://2klstk.ru/wp-content/uploads/2024/11/i.webp" />
        </div>
        <div class="sale-img">
          <img
            src="http://2klstk.ru/wp-content/uploads/2024/11/house-model-1.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import btn from "../ui/btn.vue";
import { useModalStore } from "@/stores/useModalStore";

const { openModal } = useModalStore();
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const updateTimer = () => {
  const now = new Date();
  const nextYear = new Date(now.getFullYear() + 1, 0, 1);
  const diff = nextYear.getTime() - now.getTime();

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24);
  minutes.value = Math.floor((diff / (1000 * 60)) % 60);
  seconds.value = Math.floor((diff / 1000) % 60);
};

let timerInterval: number;

onMounted(() => {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<style lang="scss" scoped>
.banner {
  padding: 3rem 0;
  text-align: center;
  position: relative;

  .banner_main {
    background-color: #1164e28e;
    @include flex-start;
    gap: 2rem;
    position: relative;
    z-index: 22;
    padding: 8rem 8rem;
    border-radius: 2rem;
    overflow: hidden;

    @include bp($point_2) {
      padding: 2rem;
      border-radius: 0;
    }
  }

  .banner_img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: 0.2;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.banner_content {
  @include flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 3rem;
  //   color: #1b1919;
  color: $white;
  text-align: left;
  max-width: 75%;
  position: relative;
  z-index: 9;

  .banner_title {
    font-size: 6rem;
    text-align: left;

    @include bp($point_2) {
      font-size: 2.4rem;
    }
  }
  .banner_subtitle {
    font-size: 2.4rem;
    max-width: 70%;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
    span {
      font-size: 3rem;
      font-weight: 600;
      background-color: #1165e2bb;
      display: inline-flex;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;

      @include bp($point_2) {
        font-size: 1.6rem;
      }
    }
  }
}

.banner_timer {
  @include flex-start;
  gap: 2rem;
}

.timer_value {
  @include flex-center;
  width: 8rem;
  height: 8rem;
  background-color: #ffffffcc;
  backdrop-filter: blur(2rem);
  color: #1165e2bb;
  border-radius: 0.5rem;
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 600;

  @include bp($point_2) {
    font-size: 2.2rem;
    width: 4rem;
    height: 5rem;
    margin-bottom: 0.5rem;
  }
}

.timer_label {
  font-size: 2rem;
  font-weight: 600;

  @include bp($point_2) {
    font-size: 1.2rem;
    font-weight: 500;
  }
}

.sale-img {
  position: absolute;
  right: -10%;
  max-width: 70%;
  @include flex-center;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    mask-image: linear-gradient(to bottom, $blue 50%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, $blue 50%, transparent 100%);
  }
}
</style>
