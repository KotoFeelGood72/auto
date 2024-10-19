<template>
  <div class="popup_popular" v-if="project && project.acf">
    <Close />
    <div class="popup_popular__row">
      <div class="popup_popular__col popup_popular__col--img">
        <div class="popup_popular__slider">
          <div class="place__gallery">
            <Swiper
              :slides-per-view="1"
              :modules="[Navigation, Pagination]"
              :space-between="20"
              :speed="700"
              :navigation="{
                prevEl: '.js-builder-navigation-prev',
                nextEl: '.js-builder-navigation-next',
              }"
            >
              <SwiperSlide
                v-for="(item, i) in project.acf.gallery"
                :key="'project-modal-gallery-item-' + i"
              >
                <div class="place__gallery_slide">
                  <a
                    :href="item.img"
                    data-fancybox="gallery"
                    class="place__gallery_img_w"
                    :data-src="item.img"
                  >
                    <img class="place__gallery_img" :src="item.img" />
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <div class="popup_popular__col popup_popular__col--info">
        <div class="popup_popular__info">
          <div class="card__title">{{ project.acf.title }}</div>
          <ul class="card__list">
            <li
              class="card__item"
              v-for="(item, i) in project.acf.character"
              :key="'project-modal-character-item' + i"
            >
              <div class="card__item_icon">
                <Icons :icon="item.icon" />
              </div>
              <div class="card__item_title">{{ item.name }}</div>
              <div class="card__item_descr">{{ item.value }}</div>
            </li>
          </ul>
          <ul class="card__about_list">
            <li
              class="card__about_item"
              v-for="(item, i) in project.acf.complects"
              :key="'project-modal-complect' + i"
            >
              <input
                type="radio"
                name="complects"
                :id="'card__about_item' + i"
                v-model="activeComplect"
                :value="i"
              />
              <label :for="'card__about_item' + i">
                {{ item.item }}
              </label>
            </li>
          </ul>

          <a
            class="btn_base popup_popular__btn js-popup-trigger-form"
            @click.prevent="handleSubmit"
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </div>
    <div class="object__tabs">
      <ul class="object_tab__links">
        <li :class="{ active: activeTab === 1 }" @click="setActiveTab(1)">
          Описание
        </li>
        <li :class="{ active: activeTab === 2 }" @click="setActiveTab(2)">
          Характеристики
        </li>
        <li :class="{ active: activeTab === 3 }" @click="setActiveTab(3)">
          Комплектации
        </li>
      </ul>

      <ul class="object_tab__contents">
        <li v-if="activeTab === 1" class="object_tab__content">
          <div class="card__descr js-popular-descr">{{ project.acf.txt }}</div>
        </li>
        <li v-if="activeTab === 2" class="object_tab__content">
          <ul class="params__list">
            <li v-for="(param, i) in project.acf.characteristics" :key="i">
              {{ param }}
            </li>
          </ul>
        </li>
        <li v-if="activeTab === 3" class="object_tab__content">
          <ul class="tab__about_list">
            <li
              class="tab__about_item"
              v-for="(item, i) in project.acf.complects"
              :key="'tab-modal-complect' + i"
            >
              <div
                class="complect-item"
                :class="{ active: activeComplect === i }"
                @click="setActiveComplect(i)"
              >
                {{ item.item }}
              </div>
              <div v-if="activeComplect === i" class="complect-description">
                {{ item.description }}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useProjectsStore } from "@/stores/useProjectStore";
import { useModalStore } from "@/stores/useModalStore";
import { Fancybox } from "@fancyapps/ui";
import Close from "../ui/Close.vue";

const { openModal, closeModal } = useModalStore();
const { getProjectById, setSendObject } = useProjectsStore();
const project = ref<any>(null);
const route = useRoute();
const router = useRouter();

const activeTab = ref(1); // Активная вкладка по умолчанию
const activeComplect = ref<number | null>(null); // Активная комплектация

const scrollToTab = (index: number) => {
  const tabsContainer = document.querySelector(".object_tab__links");
  const tabElement = tabsContainer?.children[index] as HTMLElement | null;

  if (tabElement) {
    tabElement.scrollIntoView({
      behavior: "smooth", // Плавная прокрутка
      block: "nearest", // Прокрутить элемент к ближайшей границе
      inline: "center", // Прокрутить элемент по горизонтали к центру
    });
  }
};

// Функция для смены активной вкладки
const setActiveTab = (tabIndex: number) => {
  activeTab.value = tabIndex;
  scrollToTab(tabIndex); // Прокрутка к элементу
};

const setActiveComplect = (complectIndex: number) => {
  activeComplect.value = complectIndex;
};

// Функция для отправки данных в стор при нажатии на "Оставить заявку"
const handleSubmit = () => {
  if (project.value && activeComplect.value !== null) {
    const selectedComplect = project.value.acf.complects[activeComplect.value];
    setSendObject(
      project.value.acf.gallery[0]?.img || "", // Первая картинка
      project.value.acf.title, // Название проекта
      selectedComplect.item // Выбранная комплектация
    );
    toggleModal(); // Открытие формы
  }
};

Fancybox.bind("[data-fancybox='gallery']", {});

onMounted(async () => {
  if (route.query.project) {
    project.value = await getProjectById(Number(route.query.project));
  }
  if (project.value && project.value.acf.complects.length > 0) {
    activeComplect.value = 0;
  }
});

const toggleModal = () => {
  openModal("form");
  closeModal("project");
};
</script>

<style scoped lang="scss">
.popup_popular {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #fff;
  max-height: 95dvh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 767px) {
    top: auto;
    bottom: 0;
    transform: translateY(0);
    transform: translateX(-50%);
  }
}

.object_tab__links {
  display: flex;
  list-style: none;
  padding: 0;

  @media (max-width: 767px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE и Edge */
  }

  /* Для Chrome, Safari, Opera */
  &::-webkit-scrollbar {
    display: none;
  }
}

.object_tab__links li {
  margin-right: 2rem;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s ease-in-out;

  @media (max-width: 767px) {
    margin-right: 1rem;
  }
}

.object_tab__links li.active {
  border-bottom: 2px solid #b2c593;
}

.object_tab__contents {
  margin-top: 1rem;
}

.object_tab__content {
  display: block;
}

/* Вложенные табы для комплектаций */
.tab__about_list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tab__about_item {
  cursor: pointer;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease-in-out;

  &.active {
    background-color: #b2c593;
  }
}

.complect-description {
  margin-top: 0.5rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}

.card__about_item {
  font-size: 2rem;
  border: 0.1rem solid #b2c5937c;
  border-radius: 0.5rem;
  position: relative;
  label {
    display: flex;

    transition: all 0.3s ease-in-out;
    cursor: pointer;
    padding: 1.5rem 2rem 1.5rem 4rem;
    &:hover {
      background-color: #b2c59328;
    }
    @media (max-width: 767px) {
      font-size: 1.4rem;
    }
    &:after {
      position: absolute;
      top: 50%;
      left: 1.5rem;
      transform: translateY(-50%) scale(0);
      width: 1rem;
      height: 1rem;
      content: "";
      background-color: #b2c5937c;
      border-radius: 100%;
      transition: all 0.3s ease-in-out;
    }
    &:before {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 1rem;
      width: 2rem;
      height: 2rem;
      border-radius: 100%;
      border: 0.2rem solid #b2c5937c;
      content: "";
    }
  }

  input {
    display: none;

    &:checked + label {
      background-color: #b2c59328;
      &:after {
        transform: translateY(-50%) scale(1);
      }
    }
  }
}

.card__about_item {
  margin-bottom: 1rem;
}
</style>
