<template>
  <div class="input-wrapper">
    <input
      ref="input"
      :type="type"
      :placeholder="placeholder"
      v-model="localValue"
      :class="{ error: error }"
      :maxlength="maxLength"
      @input="applyMask"
    />
    <!-- <span v-if="error" class="input-message">{{ message }}</span> -->
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "vue-toastification";
import { ref, computed, defineProps, defineEmits, watch } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    message?: string;
    error?: boolean;
    modelValue: string;
    phone?: boolean;
    maxLength?: number;
  }>(),
  {
    type: "text",
    placeholder: "Введите номер телефона",
    message: "",
    error: false,
    modelValue: "",
    phone: false,
    maxLength: 20,
  }
);

const toast = useToast();
const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

// Маска ввода и валидация
const applyMask = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  let value = inputElement.value;

  if (props.phone) {
    value = value.replace(/\D/g, "");
    if (value.startsWith("8")) {
      value = "7" + value.slice(1);
    } else if (!value.startsWith("7")) {
      value = "7" + value;
    }
    value = value.slice(0, 11);

    let formattedValue = "+7";
    if (value.length > 1) formattedValue += ` (${value.slice(1, 4)}`;
    if (value.length >= 5) formattedValue += `) ${value.slice(4, 7)}`;
    if (value.length >= 8) formattedValue += `-${value.slice(7, 9)}`;
    if (value.length >= 10) formattedValue += `-${value.slice(9, 11)}`;
    localValue.value = formattedValue;
  } else if (props.type === "text") {
    value = value.replace(/[^А-Яа-яЁё\s]/g, ""); // Только русские буквы и пробелы
    localValue.value = value;
  }
};

// Watcher для ошибок
watch(
  () => props.error,
  (newError) => {
    if (newError) {
      toast.error(props.message || "Ошибка ввода данных");
    }
  }
);
</script>
<style scoped lang="scss">
.default {
  input {
    background-color: $white;
  }
}
.transparent {
  input {
    background-color: transparent;
    color: $white;
    border-color: $white;
    &::-webkit-input-placeholder {
      opacity: 0.7;
      color: $white;
    }
  }
}
input {
  border: 0.1rem solid $border;
  font-size: 1.6rem;
  color: $black;
  padding: 2rem 3rem;
  width: 100%;
  border-radius: 1rem;
  @include bp($point_2) {
    padding: 1.5rem 2rem;
    height: 4.6rem;
  }

  &:focus {
    border-color: $black;
  }

  &.error {
    border: 0.1rem solid $red;
    color: $red !important;
    &::-webkit-input-placeholder {
      color: $red !important;
    }
  }
}

// .input-message {
//   color: $red;
//   font-size: 1.2rem;
// }
</style>
