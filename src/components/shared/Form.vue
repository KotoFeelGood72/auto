<template>
  <div :class="['form', { 'row-inputs': row }, color]">
    <Inputs
      placeholder="Ваше имя"
      v-model="form.name"
      :error="isError && (!form.name || form.name.length < 2)"
      @input="resetError"
      :maxLength="10"
      message="Допускаются только буквы русского алфавита"
    />
    <Inputs
      placeholder="+7 (___) ___-__-__"
      v-model="form.phone"
      :phone="true"
      :error="isError && form.phone.replace(/\D/g, '').length !== 11"
      @input="resetError"
    />
    <btn
      :name="isLoading ? 'Отправка...' : 'Отправить заявку'"
      :disabled="isLoading"
      styles="primary"
      color="blue"
      size="large"
      :loading="isLoading"
      @click="handleSubmit"
    />
    <div :class="[color, 'notice']">
      Нажимая на кнопку «Отправить», я даю согласие на обработку персональных
      данных.
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "../ui/Inputs.vue";
import btn from "../ui/btn.vue";
import { useFormSubmit } from "@/composables/useFormSubmit";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    color?: "white" | "black";
    row?: boolean;
    dealType: number; // Тип сделки (обязательный параметр)
    additionalData?: any; // Дополнительные данные (необязательный параметр)
  }>(),
  {
    color: "black",
    row: false,
    additionalData: {}, // По умолчанию пустой объект
  }
);

const {
  isLoading,
  isSuccess,
  isError,
  errorMessage,
  sendToCRM,
  sendToTelegram,
} = useFormSubmit();

const form = ref({
  name: "",
  phone: "",
});

const resetForm = () => {
  form.value.name = "";
  form.value.phone = "";
};

const resetError = () => {
  isError.value = false; // Сброс ошибки
};

const handleSubmit = async () => {
  isError.value = false; // Сброс ошибки перед проверкой

  if (!form.value.name || form.value.name.length < 2) {
    isError.value = true;
    return;
  }

  const phoneDigits = form.value.phone.replace(/\D/g, ""); // Удаляем все нецифровые символы
  if (phoneDigits.length !== 11 || !phoneDigits.startsWith("7")) {
    isError.value = true;
    return;
  }

  // Формируем объект данных для отправки
  const data = {
    api_key: "ed2f550d045b3d3a54d2662fe6d5e677",
    deal_type: props.dealType,
    deal_name: form.value.name,
    deal_reklama: "Автокар",
    deal_phone_mobile: form.value.phone,
    deal_status: 82,
    deal_desc: `Имя: ${form.value.name}, Телефон: ${form.value.phone}`,
    ...props.additionalData,
  };

  isLoading.value = true;

  try {
    await sendToTelegram(data);
    await sendToCRM(data);
    isSuccess.value = true;
    resetForm();
    isError.value = false; // Сброс ошибки после успешной отправки
  } catch (error) {
    isError.value = true;
    console.error("Ошибка отправки:", errorMessage.value || error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
  @include bp($point_2) {
    gap: 1rem;
  }

  &.white {
    :deep(input) {
      background-color: transparent;
      color: $white;
      &::-webkit-input-placeholder {
        color: $white;
      }
    }
  }

  &.row-inputs {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    @include bp($point_2) {
      gap: 1rem;
    }

    :deep(.btn) {
      width: 100%;
    }

    :deep(.input-wrapper) {
      flex-grow: 1;
    }
  }
}



.black {
  color: $black;
}
.white {
  color: $black;
}

.notice {
  text-align: center;
  font-size: 1.4rem;
  max-width: 80%;
  margin: 0 auto;
  @include bp($point_2) {
    font-size: 1.2rem;
  }
}
</style>
