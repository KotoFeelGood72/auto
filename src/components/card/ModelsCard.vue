<template>
  <RouterLink v-if="card" :to="'/cars/' + card.slug">
    <div class="card">
      <div class="img">
        <img :src="card.url" class="" />
      </div>
      <p class="title">{{ card.title }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
// import { useRoute } from "vue-router";
defineProps<{
  card: any;
}>();
</script>

<style scoped lang="scss">
.card {
  width: 9.7rem;
  height: 6.7rem;
  border: 0.1rem solid #c8c8c9;
  background-color: $white;
  @include flex-center;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  font-size: 1.4rem;
  @include bp($point_2) {
    @include flex-start;
    width: auto;
    height: 5rem;
    flex-direction: row;
    gap: 0.5rem;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
}
a {
  @include bp($point_2) {
    flex-grow: 1;
    @include flex-center;
  }
}

.router-link-active.router-link-exact-active {
  .card {
    border-color: $primary;
    color: $primary;
    background-color: #0657ee23;
  }
}

.img {
  width: 4rem;
  height: auto;
  @include flex-center;
  object-fit: contain;

  @include bp($point_2) {
    flex-grow: 1;
  }
}
</style>
