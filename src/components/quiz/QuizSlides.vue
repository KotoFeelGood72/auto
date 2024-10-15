<template>
  <div
    v-if="steps && steps?.length"
    v-for="(step, stepIndex) in steps"
    :key="stepIndex"
  >
    <transition name="slide-fade" mode="out-in">
      <div v-if="currentStep === stepIndex + 1" class="calc__slide">
        <div class="calc__slide_title">{{ step.title }}</div>
        <div v-if="stepIndex === steps?.length - 1">
          <QuizFormStep :formData="formData" @submit="submitQuiz" />
        </div>
        <ul
          v-else
          class="calc__slide_list"
          :class="'grid-' + step?.options?.length"
        >
          <li
            v-for="(option, index) in step.options || []"
            :key="index"
            class="calc__slide_item"
          >
            <label>
              <div
                :class="[
                  { 'default-item': !option?.image },
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
                <div
                  class="calc__slide_item_img_w"
                  v-if="option && option.image"
                >
                  <img
                    src="https://i.pinimg.com/originals/06/8a/bd/068abd6590c42f6cc13a9e0cd8d65c01.jpg"
                  />
                </div>
                <div class="calc__slide_item_title">{{ option.title }}</div>
              </div>
            </label>
          </li>
        </ul>
      </div>
    </transition>
  </div>
  <div class="calc__slide_btn_w">
    <button
      v-if="currentStep < steps.length"
      @click="nextStep"
      class="calc__slide_btn_forward btn_base"
    >
      Далее
    </button>
  </div>
</template>

<script setup>
import QuizFormStep from "./QuizFormStep.vue";
import { useQuizStore, useQuizStoreRefs } from "@/stores/useQuizStore";

const { steps, formData, selectedOptions, currentStep } = useQuizStoreRefs();
const { addQuizData, updateCurrentStep } = useQuizStore();

const onOptionSelected = (stepIndex, option) => {
  if (!steps.value[stepIndex]?.options) {
    console.error(`Options для шага ${stepIndex} не найдены.`);
    return;
  }

  addQuizData({ step: stepIndex, selectedOption: option });
  setTimeout(() => {
    nextStep();
  }, 500);
};

// Метод для отправки формы
const submitQuiz = () => {
  const quizData = {
    name: formData.name,
    phone: formData.phone,
  };
  console.log("Данные формы: ", quizData);
  alert("Данные отправлены!");
  // Логика отправки данных на сервер
};

const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    updateCurrentStep(currentStep.value + 1);
  }
};
</script>

<style scoped lang="scss">
/* Стили для анимации смены шага */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.2s ease-in-out;
  // transition: opacity 0.2s ease, transform 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  // transform: translateX(100%);
}

.calc__slide_list {
  display: grid;
  gap: 2rem;
  &.grid-2 {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
  &.grid-4 {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
  &.grid-5 {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }
  &.grid-6 {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
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
    padding: 2rem;
    border-radius: 1rem;
    transition: all 0.3s ease-in-out;
    position: relative;
    font-size: 1.8rem;
    &:before {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 1rem;
      width: 2rem;
      height: 2rem;
      border-radius: 100%;
      background-color: #b2c59354;
      content: "";
      border: 0.1rem solid #b2c593;
    }
    &:after {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 1.5rem;
      width: 1rem;
      height: 1rem;
      border-radius: 100%;
      background-color: white;
      content: "";
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
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
  position: relative;
  border: 0.2rem solid transparent;
  &:before {
    position: absolute;
    top: 2rem;
    left: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    background-color: white;
    content: "";
    border: 0.1rem solid #b2c593;
    opacity: 0.5;
    backdrop-filter: blur(1rem);
  }
  &:after {
    position: absolute;
    top: 2.8rem;
    left: 2.75rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    background-color: #b2c593;
    content: "";
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
    transform: scale(0);
  }
}
</style>
