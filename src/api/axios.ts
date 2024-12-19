import axios from "axios";

// Настройка основного API
const api = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_BASE_URL + '/wp-content/uploads/json'
      : "/api/wp/",
});

export { api };
