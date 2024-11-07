<template>
  <div class="excursion__form">
    <form @submit.prevent="submitForm">
      <div class="excursion__form_in">
        <h4 class="excursion__form_title">
          Укажите, когда вам удобно посетить экскурсию и оставьте контактные
          данные
        </h4>
        <div class="excursion__form_list">
          <div class="excursion__form_item">
            <div class="form_input">
              <label class="form_input__label" for="date">Укажите дату</label>
              <div class="form_input__field">
                <input
                  class="form_input__element"
                  type="text"
                  id="date"
                  v-model="formData.date"
                  @blur="v$.date.$touch"
                  :class="{ error: v$.date.$error }"
                  placeholder="Укажите дату"
                />
                <div v-if="v$.date.$error" class="error-message">
                  <span>Дата обязательна для заполнения</span>
                </div>
              </div>
            </div>
          </div>
          <div class="excursion__form_item">
            <div class="form_input">
              <label class="form_input__label" for="phone"
                >Введите номер телефона</label
              >
              <div class="form_input__field">
                <MaskInput
                  type="tel"
                  v-model="formData.phone"
                  @blur="v$.phone.$touch"
                  :class="[{ error: v$.phone.$error }, 'form_input__element']"
                  mask="+7 (###) ###-##-##"
                />
                <div v-if="v$.phone.$error" class="error-message">
                  <span>Введите корректный номер телефона</span>
                </div>
              </div>
            </div>
          </div>
          <div class="excursion__form_item">
            <div class="form_input">
              <label class="form_input__label" for="name">Введите имя</label>
              <div class="form_input__field">
                <input
                  class="form_input__element"
                  type="text"
                  id="name"
                  v-model="formData.name"
                  @blur="v$.name.$touch"
                  :class="{ error: v$.name.$error }"
                  placeholder="Имя"
                />
                <div v-if="v$.name.$error" class="error-message">
                  <span>Имя обязательно для заполнения</span>
                </div>
              </div>
            </div>
          </div>
          <div class="excursion__form_item">
            <input
              class="excursion__form_submit btn_base"
              type="button"
              :disabled="isLoading"
              value="Записаться на экскурсию"
              @click="submitForm"
            />
          </div>
        </div>
      </div>
      <div class="loader" v-if="isLoading">
        <Icons icon="svg-spinners:ring-resize" :size="100" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useTelegram } from "@/composables/useTelegram";

// Данные формы
const formData = ref({
  date: "",
  phone: "",
  name: "",
});

// Telegram API methods
const { sendFormWithoutFile, isLoading, errorMessage } = useTelegram();

// Правила валидации (просто обязательное поле для даты)
const rules = {
  date: { required },
  phone: { required },
  name: { required },
};

const v$ = useVuelidate(rules, formData);

// Метод отправки формы и данных в Telegram
const submitForm = async () => {
  v$.value.$touch(); // Активируем валидацию
  if (v$.value.$invalid) {
    console.log("Форма содержит ошибки.");
  } else {
    try {
      // Отправляем данные в Telegram
      await sendFormWithoutFile(
        formData.value.name,
        formData.value.phone,
        formData.value.date,
        "Заявка на экскурсию"
      );
      clearValidation(); // Очищаем состояние валидации
      resetForm(); // Очищаем форму после успешной отправки
    } catch (error) {
      console.error("Ошибка при отправке данных:", errorMessage.value);
    }
  }
};

// Метод очистки состояния валидации
const clearValidation = () => {
  v$.value.$reset(); // Сбрасываем состояние валидации
};

// Сброс формы после отправки
const resetForm = () => {
  formData.value.date = "";
  formData.value.phone = "";
  formData.value.name = "";
};
</script>

<style scoped lang="scss">
.excursion__form {
  position: relative;
}
.error-message {
  color: red;
  padding: 1rem;
  font-size: 1.2rem;
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
}
</style>
