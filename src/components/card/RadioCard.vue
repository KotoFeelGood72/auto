<template>
  <div class="card-check">
    <label :for="card.id">
      <div class="card">
        <heading :title="card.title" :level="5" :size="24" />
        <heading :title="'от ' + card.price + ' ₽'" :level="4" :size="20" />
        <p class="text">
          {{ card.params }}
        </p>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import heading from "../heading.vue";
import { computed } from "vue";
const props = defineProps<{
  modelValue: any;
  card: {
    id: string;
    name: string;
    title: string;
    price: string | number;
    params: string;
  };
}>();

const emit = defineEmits(["update:modelValue"]);
const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
.card-check {
  // input {
  //   display: none;
  //   &:checked + label {
  //     background-color: #f3f3f3;
  //     .icon {
  //       span {
  //         opacity: 1;
  //         visibility: visible;
  //       }
  //     }
  //   }
}

label {
  cursor: pointer;
  position: relative;
  padding: 1.5rem 3rem;
  border-radius: 1rem;
  @include flex-start;
  user-select: none;
  background-color: #f3f3f3;
  flex-grow: 1;
}
:deep(h4) {
  font-weight: 600;
  margin-bottom: 1rem;
}
// }

.icon {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  width: 3rem;
  height: 3rem;
  @include flex-center;
  border-radius: 100%;
  border: 0.1rem solid $primary;
  color: $primary;
  span {
    opacity: 0;
    visibility: hidden;
  }
}

:deep(h5) {
  margin-bottom: 0.5rem;
}
</style>
