<template>
  <div class="yandex-star">
    <a
      href="https://yandex.ru/maps/org/tekhnologii_komforta/165810670612/reviews/?ll=38.984871%2C45.111020&utm_source=my_review&z=15"
      target="_blank"
    >
      <div class="img">
        <img src="https://2klstk.ru/wp-content/uploads/2024/09/yandex.png" />
      </div>
      На основании 50 отзывов</a
    >
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.yandex-star {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000007;
  backdrop-filter: blur(2rem);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  overflow: hidden;
  font-size: 1.2rem;
}

a {
  color: $black;
  text-decoration: none;
}

.img {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 12rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
