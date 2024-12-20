import axios from "axios";

// Настройка основного API
const api = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://autocarmsk.ru/wp-content/uploads/json/"
      : "/api/wp/",
});

export { api };
