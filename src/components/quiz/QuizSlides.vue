<template>
  <div class="calc__container">
    <div v-for="(step, stepIndex) in steps" :key="stepIndex">
      <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" mode="out-in">
        <div v-if="currentStep === stepIndex + 1" class="calc__slide">
          <div class="calc__slide_title">{{ step.title }}</div>
          <div v-if="stepIndex === steps?.length - 1">
            <QuizFormStep />
          </div>
          <ul v-else class="calc__slide_list" :class="'grid-' + step?.options?.length">
            <li
              v-for="(option, index) in step.options || []"
              :key="index"
              class="calc__slide_item"
            >
              <label>
                <div
                  :class="[
                    { 'default-item': option.image === '' },
                    'calc__slide_item_img',
                  ]"
                >
                  <input
                    type="radio"
                    :name="'step-' + stepIndex"
                    :value="option"
                    v-model="selectedOptions[stepIndex]"
                    @change="onOptionSelected(stepIndex, option)"
                  />
                  <div class="calc__slide_item_img_w" v-if="option && option.image">
                    <img :src="option.image" />
                  </div>
                  <div class="calc__slide_item_title">
                    <div class="calc_icon">
                      <Icons
                        icon="material-symbols-light:circle-outline"
                        :size="option.image ? 40 : 25"
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
import { ref } from "vue";
import QuizFormStep from "@/components/quiz/QuizFormStep.vue";
import { useQuizStore, useQuizStoreRefs } from "@/stores/useQuizStore";
import gsap from "gsap";

const { steps, selectedOptions, currentStep } = useQuizStoreRefs();
const { addQuizData, updateCurrentStep } = useQuizStore();

// GSAP анимация для входа
const beforeEnter = (el: HTMLElement) => {
  gsap.set(el, {
    x: 100, // Начальная позиция справа
    opacity: 0,
  });
};

const enter = (el: HTMLElement, done: Function) => {
  gsap.to(el, {
    x: 0, // Сдвиг слайда на позицию
    opacity: 1,
    duration: 0.6,
    ease: "power2.out", // Плавный эффект
  });
};

// GSAP анимация для выхода
const leave = (el: HTMLElement, done: Function) => {
  gsap.to(el, {
    x: -100, // Сдвиг слайда влево при выходе
    opacity: 0,
    duration: 0.8,
    ease: "power2.in", // Плавный эффект
  });
};

const onOptionSelected = (stepIndex: any, option: any) => {
  if (!steps.value[stepIndex]?.options) {
    console.error(`Options для шага ${stepIndex} не найдены.`);
    return;
  }

  addQuizData({ step: stepIndex, selectedOption: option });
  setTimeout(() => {
    nextStep();
  }, 200);
};

const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    updateCurrentStep(currentStep.value + 1);
  }
};
</script>

<style scoped lang="scss">
.calc__container {
  position: relative;
  width: 100%;
  height: 600px; /* Фиксированная высота для контейнера */
  overflow: hidden;
  background-color: #fff;
}

.calc__slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.calc__slide_list {
  display: grid;
  gap: 2rem;
  &.grid-2 {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
  &.grid-3 {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }
  &.grid-4 {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
  &.grid-5 {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }
  &.grid-6 {
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
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
}

.default-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  .calc_icon {
    margin-top: -4rem;
    z-index: 99;
    background-color: #ffffff4c;
    display: inline-flex;
    justify-content: center;
    backdrop-filter: blur(1rem);
    border-radius: 100%;
  }
}

.calc_icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b2c593;
}
</style>
