<template>
  <section class="credit mb-8">
    <div class="section_in">
      <div class="row">
        <heading
          title="Выгодный автокредит"
          :size="32"
          class="title"
          color="white"
        />
        <ul class="services">
          <li v-for="(item, i) in credits" :key="'credits-item-' + i">
            <heading :title="item.title" :size="32" color="white" />
            <div v-html="item.txt" />
          </li>
        </ul>
        <btn
          name="Рассчитать кредит"
          size="large"
          :weight="true"
          styles="primary"
          color="white"
          @click="openModal('call')"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
import heading from "../heading.vue";
import { useModalStore } from "@/stores/useModalStore";

const { openModal } = useModalStore();

defineProps<{
  credits: any;
}>();
</script>

<style scoped lang="scss">
.row {
  background-image: url("@/assets/img/credit.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 1rem;
  overflow: hidden;
  color: $white;
  padding: 3.1rem 4rem;

  @include bp($point_2) {
    padding: 4.5rem 2rem;
    background-position: center left;
  }

  :deep(.btn) {
    padding: 1.5rem 8.4rem;
    @include bp($point_2) {
      padding: 1.5rem 4.4rem;
      width: 100%;
    }
  }
}

.title {
  margin-bottom: 2.5rem;
}

.services {
  @include flex-start;
  gap: 4rem;
  margin-bottom: 4.5rem;
  @include bp($point_2) {
    gap: 3rem;
    margin: 5rem 0;
    // flex-direction: column;
    align-items: flex-start;
  }
  li {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 14.4rem;
    @include bp($point_2) {
      min-width: auto;
    }
    div {
      font-size: 2rem;
      @include bp($point_2) {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
