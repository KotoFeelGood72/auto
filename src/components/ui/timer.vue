<template>
  <div class="timers">
    <p class="title">До конца акции осталось:</p>
    <div class="timer-row">
      <div v-for="(value, label) in time" :key="label" class="">
        <div class="timer-digit">
          <div
            v-for="(digit, i) in formatDigits(value)"
            :key="digit + label + i"
          >
            <span>{{ digit }}</span>
          </div>
        </div>
        <p class="">{{ label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const endDate = ref<number | null>(null);
const interval = ref<number | null>(null);
const now = ref<number>(Date.now());

// Функция для получения даты следующего понедельника
const getNextMonday = (): number => {
  const now = new Date();
  const day = now.getDay(); // Текущий день недели (0 - воскресенье)
  const diff = day === 1 ? 7 : day === 0 ? 1 : 8 - day; // Сколько дней до следующего понедельника
  now.setDate(now.getDate() + diff);
  now.setHours(0, 0, 0, 0); // Сбрасываем время до 00:00
  return now.getTime();
};

// Таймер
const time = computed(() => {
  if (!endDate.value) return { дней: 0, часов: 0, минут: 0, секунд: 0 };

  const distance = endDate.value - now.value;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    дней: Math.max(days, 0),
    часов: Math.max(hours, 0),
    минут: Math.max(minutes, 0),
    секунд: Math.max(seconds, 0),
  };
});

const formatDigits = (value: number) => {
  return value < 10 ? ["0", value.toString()] : value.toString().split("");
};

onMounted(() => {
  endDate.value = getNextMonday();

  interval.value = window.setInterval(() => {
    now.value = Date.now();

    if (endDate.value && now.value >= endDate.value) {
      endDate.value = getNextMonday();
    }
  }, 1000);
});

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value);
});
</script>

<style scoped lang="scss">
.timers {
  padding-top: 2rem;
  position: relative;
  z-index: 22;
}
.timer-row {
  @include flex-start;
  gap: 2rem;
  @include bp($point_2) {
    gap: 1rem;
  }

  p {
    @include flex-center;
    font-size: 2rem;
    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
}

.timer-digit {
  @include flex-start;
  background: linear-gradient(
    to right,
    rgba(49, 48, 48, 0.76) 50%,
    #4747479f 50%
  );
  width: 11rem;
  height: 6.8rem;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1.2rem;
  @include bp($point_2) {
    width: 6rem;
    height: 4rem;
    border-radius: 0.3rem;
  }

  div {
    flex-grow: 1;
    @include flex-center;
    line-height: 4rem;
  }
  span {
    font-size: 5rem;
    @include bp($point_2) {
      font-size: 2rem;
    }
  }
}

.title {
  font-size: 2rem;
  margin-bottom: 2.8rem;
}
</style>
