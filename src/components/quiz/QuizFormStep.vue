<template>
  <div class="calc__thx">
    <div class="popup_call__form">
      <div class="popup_call__form_list">
        <div class="popup_call__form_item">
          <div class="form_input">
            <label class="form_input__label">Ваше имя</label>
            <div class="form_input__field">
              <input
                class="form_input__element"
                type="text"
                v-model="formData.name"
                @blur="v$.name.$touch"
                :class="{ error: v$?.name?.$error }"
                placeholder="Имя"
              />
              <div v-if="v$.name.$error" class="error-message">
                <span>Поле обязательно для заполнения</span>
              </div>
            </div>
          </div>
        </div>
        <div class="popup_call__form_item">
          <div class="form_input">
            <label class="form_input__label">Ваш телефон</label>
            <div class="form_input__field">
              <MaskInput
                type="tel"
                v-model="formData.phone"
                @blur="v$.phone.$touch"
                @input="handlePhoneInput"
                @keypress="blockInvalidInput"
                :class="[{ error: v$?.phone?.$error }, 'form_input__element']"
                mask="+7 (###) ###-##-##"
              />
              <div v-if="v$?.phone?.$error" class="error-message">
                <span>Поле обязательно для заполнения</span>
              </div>
            </div>
          </div>
        </div>
        <div class="popup_call__form_item js-step-form-submit">
          <input
            class="popup_call__form_submit btn_base"
            type="button"
            value="Получить подарок"
            @click="submitForm"
          />
        </div>
      </div>
      <div class="loader" v-if="isLoading">
        <Icons icon="svg-spinners:ring-resize" :size="100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { useTelegram } from "@/composables/useTelegram";
import { useQuizStoreRefs } from "@/stores/useQuizStore";
import { usePhoneValidation } from "@/composables/usePhoneValidation";
const { phoneValidator, blockInvalidInput, handlePhoneInput } =
  usePhoneValidation();
// Данные формы
const formData = ref({
  name: "",
  phone: "",
});

// Данные quiz
const { selectedOptions, currentStep } = useQuizStoreRefs();

// Telegram API methods
const { sendFormWithQuiz, isLoading, errorMessage } = useTelegram();

const rules = {
  name: { required, minLength: minLength(2) },
  phone: {
    required,
    phone: phoneValidator,
  },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  v$.value.$touch(); // Активируем валидацию
  if (v$.value.$invalid) {
    console.log("Форма содержит ошибки.");
    return; // Не продолжаем отправку, если есть ошибки
  }

  try {
    // Отправка данных формы и квиза
    await sendFormWithQuiz(
      formData.value.name,
      formData.value.phone,
      selectedOptions.value
    );

    resetForm(); // Сбрасываем форму после успешной отправки
    v$.value.$reset(); // Сбрасываем состояние валидации после отправки
  } catch (error) {
    console.error("Ошибка при отправке данных:", errorMessage.value);
  }
};

// Сброс формы после отправки
const resetForm = () => {
  formData.value.name = "";
  formData.value.phone = "";
  selectedOptions.value = [];
  currentStep.value = 1;
};
</script>

<style scoped lang="scss">
.calc__thx {
  position: relative;
}
.error-message {
  color: red;
  padding: 1rem;
  font-size: 1.6rem;
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff70;
  backdrop-filter: blur(2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b2c593;
  border-radius: 2rem;
}
</style>
