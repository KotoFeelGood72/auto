import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://2klstk.ru/wp-content/uploads/json/" // Прямой путь для продакшена
      : "/api/", // Путь для локальной разработки с проксированием
});

export { api };
