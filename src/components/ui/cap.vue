<template>
  <div v-if="num" class="cap" :class="['cap-' + num]"></div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    num: number | null;
  }>(),
  {
    num: null,
  }
);
</script>

<style scoped lang="scss">
.cap {
  position: absolute;
  top: -0.5rem;
  left: -3.3rem;
  width: 8rem;
  height: 8rem;
  content: "";
  background-image: url("../../assets/new-year/cap_1.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;

  &.cap-1 {
    background-image: url("../../assets/new-year/cap_2.png");
  }
  &.cap-2 {
    background-image: url("../../assets/new-year/cap_3.png");
  }
  &.cap-3 {
    background-image: url("../../assets/new-year/cap_3.png");
  }
  &.cap-4 {
    background-image: url("../../assets/new-year/cap_4.png");
  }
  &.cap-5 {
    background-image: url("../../assets/new-year/cap_5.png");
  }
}
</style>
