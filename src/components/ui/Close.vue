<template>
  <div class="close" @click="allCloserModal()">
    <Icons icon="material-symbols:close" :size="40" />
  </div>
</template>

<script setup lang="ts">
import { useCloserModal } from "@/composables/useCloserModal";

const { allCloserModal } = useCloserModal();
</script>

<style scoped lang="scss">
.close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    color: rgb(245, 42, 42);
  }
}
</style>
