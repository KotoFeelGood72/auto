<template>
  <section class="section calc js-step-form-w">
    <div class="section_in calc__in">
      <h2 class="calc__title">
        <strong>Получите предварительный расчет стоимости </strong> дома за 1 минуту
      </h2>
      <div class="calc__form">
        <div class="calc__form_row">
          <div class="calc__form_col">
            <div class="calc__progres" id="calc-list">
              <div
                :data-progress="progressWidthRounded + '%'"
                class="calc__progres_line js-step-form-progres"
                :style="{ width: progressWidthRounded + '%' }"
              ></div>
              <span
                class="progress_decor"
                :style="{ width: progressWidthRounded + '%' }"
              ></span>
            </div>

            <div class="calc__slide_w">
              <QuizSlides />
            </div>
          </div>
          <QuizAbout />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import QuizAbout from "@/components/quiz/QuizAbout.vue";
import QuizSlides from "@/components/quiz/QuizSlides.vue";
import { computed } from "vue";
import { useQuizStoreRefs } from "@/stores/useQuizStore";
const { currentStep, steps } = useQuizStoreRefs();
const totalSteps = computed(() => steps.value.length);

const progressWidth = computed(() => (currentStep.value / totalSteps.value) * 100);

const progressWidthRounded = computed(() => progressWidth.value.toFixed(0));
</script>

<style scoped lang="scss">
.calc__progres {
  position: relative;
}
.calc__progres_line {
  transition: all 0.3s ease-in-out;

  &:before {
    position: absolute;
    content: attr(data-progress);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.4rem;
    font-weight: 600;
  }
}

.calc__form_row {
}
</style>
