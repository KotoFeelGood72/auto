<template>
  <div class="loader">
    <div class="center">
      <Logo class="loader-logo" />
      <div class="loader-icon">
        <Icons icon="svg-spinners:ring-resize" :size="50" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";
</script>

<style scoped lang="scss">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $white;
  backdrop-filter: blur(2rem);
  @include flex-center;
  z-index: 9999;
}

.center {
  @include flex-center;
  flex-direction: column;
}

.loader-icon {
  color: $primary;
  @include flex-center;
  margin-top: 3rem;
  position: relative;
  z-index: 2;
  @include bp($point_2) {
    width: 3rem;
    height: 3rem;
    margin-top: 1rem;
  }
}

.loader-logo {
  position: relative;
  z-index: 2;
  :deep(.logo-img) {
    padding-right: 0;
    border: none;
  }
  :deep(.logo-txt) {
    display: none;
  }
}
</style>
