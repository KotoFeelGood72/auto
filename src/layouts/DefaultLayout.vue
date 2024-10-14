<template>
  <MainHeader />
  <div class="wrapper">
    <div class="base">
      <slot />
    </div>
  </div>
  <MainFooter />
</template>

<script setup lang="ts">
import MainFooter from "@/components/shared/MainFooter.vue";
import MainHeader from "@/components/shared/MainHeader.vue";
</script>

<style scoped lang="scss"></style>
