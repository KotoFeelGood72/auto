<template>
  <section class="section popular" v-if="projects" id="projects">
    <div class="section_in popular__in">
      <h2 class="popular__title">
        <cap :num="5" /><strong>Популярные проекты</strong> и цены
      </h2>
      <div class="popular__list_w">
        <div class="popular__list">
          <div
            class="popular__card"
            v-for="(item, i) in visibleProjects"
            :key="'popular-projects-item' + i"
            @click="opeModalProject(item.id)"
          >
            <div class="card js-popular-card-popup">
              <div class="card__img_w">
                <div class="card__decor">
                  <img
                    src="http://2klstk.ru/wp-content/uploads/2024/11/bda4f13cd3190eed9d5544edeec51085.png"
                  />
                </div>
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
                      <Icons :icon="getIcon(character.icon)" />
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

        <div class="projects__bottom">
          <btn
            name="Показать еще"
            size="large"
            v-if="visibleProjects.length < projects.length"
            class="btn_base_s"
            @click="loadMore"
            :caps="5"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
import cap from "../ui/cap.vue";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/useModalStore";
import {
  useProjectsStore,
  useProjectsStoreRefs,
} from "@/stores/useProjectStore";

const { openModal, closeModal } = useModalStore();
const { getProjects } = useProjectsStore();
const { projects } = useProjectsStoreRefs();
const router = useRouter();

// Управление видимыми проектами
const visibleProjects = ref<any>([]); // Список проектов, которые отображаются
const itemsPerPage = 6; // Количество проектов на странице
let currentPage = 1; // Текущая страница

// Открытие модального окна с добавлением query
const opeModalProject = (id: number) => {
  router.push({ query: { project: id } }).then(() => {
    openModal("project");
  });
};

// Функция для загрузки проектов по страницам
const loadMore = () => {
  const nextPageItems = projects.value.slice(0, currentPage * itemsPerPage);
  visibleProjects.value = nextPageItems;
  currentPage++;
};

// Следим за изменениями в параметрах URL и автоматически открываем/закрываем модальное окно
watch(
  () => router.currentRoute.value.query.project,
  (newValue) => {
    if (newValue) {
      openModal("project");
    } else {
      closeModal("project");
    }
  }
);

onMounted(() => {
  // Загружаем проекты и отображаем первую страницу
  getProjects().then(() => {
    loadMore(); // Показать первые 6 проектов
  });
});

const getIcon = (icon: string) => {
  switch (icon) {
    case "size-1":
      return "ph:resize-thin";
    case "room":
      return "fluent:conference-room-20-regular";
    case "square":
      return "tabler:meter-square";
    case "bad":
      return "material-symbols-light:bedroom-child-outline-rounded";
  }
};
</script>

<style scoped lang="scss">
.popular__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 2rem;

  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}

.load-more-btn {
  display: block;
  margin: 2rem auto;
  padding: 1rem 2rem;
  background-color: #bde977;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;

  &:hover {
    background-color: #a9d669;
  }
}
.projects__bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.card__decor {
  position: absolute;
  top: -4rem;
  left: -2rem;
  width: 20rem;
  height: 20rem;
  z-index: 22;
}

.card__img_w {
  position: relative;
}

.popular__card {
  .card {
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 0 2rem 0 #0000003d;
      transform: translateY(-0.5rem);
    }
  }
}
</style>
