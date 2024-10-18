<template>
  <div class="calc__container" ref="calcContainer">
    <div v-for="(step, stepIndex) in steps" :key="stepIndex">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        mode="out-in"
      >
        <div v-if="currentStep === stepIndex + 1" class="calc__slide">
          <div class="calc__slide_title">{{ step.title }}</div>
          <div v-if="stepIndex === steps?.length - 1">
            <QuizFormStep />
          </div>
          <ul
            v-else
            class="calc__slide_list"
            :class="[
              step?.options?.some((option: any) => option?.image) ? 'images' : 'text',
              'grid-' + step?.options?.length
            ]"
          >
            <li
              v-for="(option, index) in step?.options || []"
              :key="index"
              class="calc__slide_item"
            >
              <label>
                <div
                  :class="[
                    { 'default-item': !option?.image },
                    'calc__slide_item_img',
                  ]"
                  @mouseover="hoveredOption = option"
                  @mouseleave="hoveredOption = null"
                >
                  <input
                    type="radio"
                    :name="'step-' + stepIndex"
                    :value="option"
                    v-model="selectedOptions[stepIndex]"
                    @change="onOptionSelected(stepIndex, option)"
                  />
                  <div
                    class="calc__slide_item_img_w"
                    v-if="option && option.image"
                  >
                    <img :src="option.image" />
                  </div>
                  <div class="calc__slide_item_title">
                    <div class="calc_icon">
                      <Icons
                        :icon="
                          selectedOptions[stepIndex] === option
                            ? 'material-symbols:check-circle'
                            : hoveredOption === option
                            ? 'material-symbols:radio-button-checked'
                            : 'material-symbols-light:circle-outline'
                        "
                        :size="option.image ? 30 : 25"
                      />
                    </div>
                    <p>{{ option.title }}</p>
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from "vue";
import QuizFormStep from "@/components/quiz/QuizFormStep.vue";
import { useQuizStore, useQuizStoreRefs } from "@/stores/useQuizStore";
// @ts-ignore
import gsap from "gsap";

// Ссылки на состояния из store
const { steps, selectedOptions, currentStep } = useQuizStoreRefs();
const { addQuizData, updateCurrentStep } = useQuizStore();

// Переменная для хранения состояния hover
const hoveredOption = ref<any>(null);
const calcContainer = ref<any | null>(null); // Контейнер для квиза

// Метод для динамического расчета высоты
const updateContainerHeight = async () => {
  await nextTick(); // Ждем, пока DOM обновится

  const activeSlide = document.querySelector(".calc__slide");
  if (activeSlide && calcContainer.value) {
    const contentHeight = activeSlide.scrollHeight; // Высота активного слайда
    calcContainer.value.style.height = `${contentHeight}px`; // Устанавливаем высоту контейнера
  }
};

// GSAP анимация для входа
const beforeEnter = (el: any) => {
  gsap.set(el, {
    x: 100, // Начальная позиция справа
    opacity: 0,
  });
};

const enter = (el: any) => {
  gsap.to(el, {
    x: 0, // Сдвиг слайда на позицию
    opacity: 1,
    duration: 0.6,
    ease: "power2.out", // Плавный эффект
  });
  updateContainerHeight(); // Обновляем высоту при появлении слайда
};

// GSAP анимация для выхода
const leave = (el: any, done: any) => {
  gsap.to(el, {
    x: -100, // Сдвиг слайда влево при выходе
    opacity: 0,
    duration: 0.8,
    ease: "power2.in",
    onComplete: done,
  });
};

const onOptionSelected = (stepIndex: any, option: any) => {
  if (!steps.value[stepIndex]?.options) {
    console.error(`Options для шага ${stepIndex} не найдены.`);
    return;
  }

  addQuizData({ step: stepIndex, selectedOption: option });
  switch (stepIndex) {
    case 0:
      ym(98477147, "reachGoal", "proekt");
      break;
    case 1:
      ym(98477147, "reachGoal", "stil");
      break;
    case 2:
      ym(98477147, "reachGoal", "etazh");
      break;
    case 3:
      ym(98477147, "reachGoal", "m2");
      break;
    default:
      break;
  }
  setTimeout(() => {
    nextStep();
  }, 200);
};

const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    updateCurrentStep(currentStep.value + 1);
  }
};

// Обновление высоты при монтировании компонента
onMounted(() => {
  updateContainerHeight();
});

// Следим за изменением текущего шага, чтобы обновить высоту
watch(currentStep, () => {
  updateContainerHeight();
});
</script>

<style scoped lang="scss">
.calc__container {
  position: relative;
  width: 100%;
  min-height: 52rem;
  overflow: hidden;
  background-color: #fff;
  border-radius: 2rem;
  overflow: hidden;
  transition: min-height 0.3s ease;
  @media (max-width: 767px) {
    min-height: 59rem;
  }
}

.calc__slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 2rem;
  overflow-y: auto;
  scrollbar-width: 0;
}

.calc__slide_list {
  display: grid;
  gap: 0.5rem 1rem;

  @media (max-width: 767px) {
    gap: 1.5rem 0.5rem;
  }

  &.text {
    &.grid-2 {
      grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      }
    }
    &.grid-3 {
      grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
      }
    }
    &.grid-4 {
      grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
      }
    }
    &.grid-5 {
      grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
      }
    }
    &.grid-6 {
      grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      }
    }
  }

  &.images {
    &.grid-2 {
      grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      }
    }
    &.grid-3 {
      grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      }
    }
    &.grid-4 {
      grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      }
    }
    &.grid-5 {
      grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      }
    }
    &.grid-6 {
      grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
      @media (max-width: 767px) {
        grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
      }
    }
  }
  li {
    text-align: left;
  }
}

.default-item {
  &:hover {
    .calc__slide_item_title {
      background-color: #b2c59375;
    }
  }

  .calc__slide_item_title {
    border: 0.1rem solid #b2c59375;
    padding: 1.5rem 2rem;
    border-radius: 1rem;
    transition: all 0.3s ease-in-out;
    position: relative;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;

    @media (max-width: 767px) {
      font-size: 1.4rem;
      padding: 1rem 1rem;
    }
  }
}

.calc__slide_item_title {
  p {
    @media (max-width: 767px) {
      font-size: 1.4rem;
    }
  }
}

.calc__slide_item_img {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input:checked + .calc__slide_item_img_w {
    &:after {
      opacity: 1;
      visibility: visible;
    }
    &:before {
      opacity: 1;
      backdrop-filter: blur(0);
    }
  }
  input:checked + .calc__slide_item_title {
    &:after {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%);
    }
    &:before {
      opacity: 1;
      backdrop-filter: blur(0);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.calc__slide_item_img_w {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  border: 0.2rem solid transparent;
  transition: all 0.3s ease-in-out;
}

.calc__slide_item_img {
  align-items: center;
  text-align: center;
  .calc__slide_item_title {
    margin-top: -4rem;
  }
  .calc_icon {
    z-index: 99;
    background-color: #ffffff;
    display: inline-flex;
    justify-content: center;
    border-radius: 100%;
  }

  &:hover {
    .calc__slide_item_img_w {
      border-color: #bde977;
    }
  }
}

.default-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (max-width: 767px) {
    text-align: left;
  }
  .calc__slide_item_title {
    margin-top: 0;
  }
  .calc_icon {
    margin-top: 0;
    background-color: transparent;
  }
}

.calc_icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b2c593;
}
</style>
