<template>
  <div @click="openModal('trade')" class="fly">
    <img src="@/assets/img/trade.png" />
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/stores/useModalStore";

const { openModal } = useModalStore();
</script>

<style scoped lang="scss">
.fly {
  max-width: 20rem;
  @include flex-center;
  position: fixed;
  bottom: 4rem;
  left: 4rem;
  z-index: 99;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  img {
    width: 100%;
  }

  @include bp($point_2) {
    display: none;
  }
}
</style>
