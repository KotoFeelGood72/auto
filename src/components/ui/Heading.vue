<template>
  <component
    :is="`h${level}`"
    :class="[sizes, { uppercase: uppercase }, isColor]"
  >
    <span><slot></slot></span>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    level?: number;
    size?: number;
    uppercase?: boolean;
    color?: "dark" | "white";
  }>(),
  {
    title: "",
    level: 3,
    size: 1,
    uppercase: true,
  }
);

const sizes = computed(() => {
  return `heading-${props.size}`;
});
const isColor = computed(() => {
  return `color-${props.color}`;
});
</script>

<style lang="scss" scoped>
.heading-1 {
  font-size: 32px;
  line-height: 40px;
}

.heading-3 {
  font-size: 20px;
  line-height: 28px;
}
.heading-26 {
  font-size: 26px;
  line-height: 100%;
}

.heading-20 {
  font-family: $font_5;
  &.uppercase {
    text-transform: uppercase;
  }
  &.color-white {
    color: $white;
  }
}

.heading-16 {
  font-size: 1.6rem;
  line-height: 100%;
  font-family: $font_5;
  line-height: 130%;
}
.heading-18 {
  font-size: 1.8rem;
  line-height: 100%;
  font-family: $font_5;
}
.heading-20 {
  font-size: 2rem;
  line-height: 100%;
  font-family: $font_5;
}
.heading-24 {
  font-size: 2.4rem;
  line-height: 100%;
  font-family: $font_5;
}
.heading-28 {
  font-size: 2.8rem;
  line-height: 100%;
  font-family: $font_5;
}
.heading-100 {
  font-size: 10rem;
  line-height: 100%;
  font-family: $font_5;
}
.heading-45 {
  line-height: 100%;
  font-family: $font_4;
  font-size: 4.5rem;
  &.color-white {
    color: $white;
  }
}
.heading-50 {
  line-height: 100%;
  font-family: $font_4;
  font-size: 5rem;
}
</style>
