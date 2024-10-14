<template>
  <section class="section popular">
    <div class="section_in popular__in">
      <h2 class="popular__title"><strong>Популярные проекты</strong> и цены</h2>
      <div class="popular__list_w">
        <div class="popular__list">
          <div
            class="popular__card"
            v-for="(item, i) in projects"
            :key="'popular-projects-item' + i"
            @click="opeModalProject(item.id)"
          >
            <div class="card js-popular-card-popup">
              <div class="card__img_w">
                <img
                  class="card__img"
                  :src="item.acf.gallery[item.acf.gallery.length - 1].img"
                />
              </div>
              <div class="card__info">
                <div class="card__title">{{ item.acf.title }}</div>
                <ul class="card__list">
                  <li
                    class="card__item"
                    v-for="(character, i) in item.acf.character"
                    :key="'character-item' + i"
                  >
                    <div class="card__item_icon">
                      <Icons :icon="character.icon" />
                    </div>
                    <div class="card__item_title">{{ character.name }}:</div>
                    <div class="card__item_descr">{{ character.value }}</div>
                  </li>
                </ul>
                <div class="card__price">
                  Стоимость <strong>{{ item.acf.price }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { useModalStore } from "@/stores/useModalStore";
import { useRouter } from "vue-router";
import {
  useProjectsStore,
  useProjectsStoreRefs,
} from "@/stores/useProjectStore";

const { openModal, closeModal } = useModalStore();
const { getProjects } = useProjectsStore();
const { projects } = useProjectsStoreRefs();
const router = useRouter();

// Открытие модального окна с добавлением query
const opeModalProject = (id: number) => {
  // Добавляем query параметр в URL
  router.push({ query: { project: id } }).then(() => {
    // Открываем модальное окно после обновления URL
    openModal("project");
  });
};

// Следим за изменениями в параметрах URL и автоматически открываем/закрываем модальное окно
watch(
  () => router.currentRoute.value.query.project,
  (newValue) => {
    if (newValue) {
      // Если параметр project есть в URL, открываем модальное окно
      openModal("project");
    } else {
      // Если параметра нет, закрываем модальное окно
      closeModal("project");
    }
  }
);

onMounted(() => {
  getProjects();
});
</script>

<style scoped lang="scss">
.popular__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 2rem;
}
</style>
