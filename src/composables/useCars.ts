import axios from "axios";
import { api } from "@/api/axios";
import { ref, computed, onMounted, onUnmounted } from "vue";

const cars = ref<any>([]); // Все автомобили
const filteredCars = ref<any>([]); // Для хранения отфильтрованных машин
const itemsPerPage = ref<any>(10); // Количество элементов для подгрузки за раз

const selectedBrand = ref<any>(null); // Выбранный бренд
const popularCars = ref<any>([]); // Популярные автомобили
const promotionalCars = ref<any>([]); // Промо-автомобили
const singleCar = ref<any>(null);
const isLoading = ref<boolean>(false); // Индикатор загрузки новых данных
const allItemsLoaded = ref<boolean>(false);

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const filterByBrand = async (brand: any) => {
  if (!cars.value || cars.value.length === 0) {
    await useGetAll();
  }

  selectedBrand.value = brand;

  if (brand) {
    const filtered = cars.value.filter((car: any) =>
      car.terms?.brand[0].toLowerCase().includes(brand.toLowerCase())
    );
    if (filtered.length > 0) {
      filteredCars.value = filtered.slice(0, itemsPerPage.value);
      // console.log(filteredCars.value);
    } else {
      filteredCars.value = [];
    }
  } else {
    filteredCars.value = cars.value.slice(0, itemsPerPage.value);
  }

  allItemsLoaded.value = false;
};

const loadMoreCars = () => {
  if (isLoading.value || allItemsLoaded.value) return;

  isLoading.value = true;

  setTimeout(() => {
    const start = filteredCars.value.length;
    const end = start + itemsPerPage.value;

    let additionalCars;

    // Если выбран бренд, подгружаем только машины этого бренда
    if (selectedBrand.value) {
      additionalCars = cars.value
        .filter((car: any) => car.brand === selectedBrand.value)
        .slice(start, end);
    } else {
      additionalCars = cars.value.slice(start, end); // Все автомобили
    }

    // Проверка, есть ли еще машины для подгрузки
    if (additionalCars.length > 0) {
      filteredCars.value.push(...additionalCars);
    } else {
      allItemsLoaded.value = true; // Все данные загружены
    }

    isLoading.value = false;
  }, 500);
};

// Обработчик прокрутки
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollHeight - scrollTop <= clientHeight + 100) {
    // Если пользователь прокрутил близко к концу страницы
    loadMoreCars();
  }
};

// Инициализация и удаление обработчика прокрутки
const initScrollListener = () => {
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
};

// Получение всех автомобилей
export const useGetAll = async (popularCount: any = 5, promoCount: any = 5) => {
  try {
    const response = await api.get(`auto/all-auto.json`);
    cars.value = response.data;

    // Формируем список уникальных брендов
    // brands = Array.from(new Set(cars.value.map((car: any) => car.brand)));

    // Устанавливаем начальные данные
    filteredCars.value = cars.value.slice(0, itemsPerPage.value); // Начальная порция
    allItemsLoaded.value = cars.value.length <= itemsPerPage.value;

    // Формируем популярные и промо-автомобили
    popularCars.value = shuffleArray([...cars.value]).slice(0, popularCount);
    promotionalCars.value = shuffleArray([...cars.value]).slice(0, promoCount);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
};

export const useGetCarBySlug = async (slug: any) => {
  try {
    const response = await api.get(`/auto/${slug}.json`);
    singleCar.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки машины по слагу:", error);
    singleCar.value = null;
  }
};

export const useCars = () => {
  return {
    cars,
    filteredCars,
    selectedBrand,
    itemsPerPage,
    popularCars,
    promotionalCars,
    singleCar,
    isLoading,
    allItemsLoaded,
    useGetAll,
    filterByBrand,
    loadMoreCars,
    initScrollListener,
    useGetCarBySlug,
    handleScroll,
  };
};
