import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://2klstk.ru/wp-content/uploads/json/"
      : "/api/",
});

export { api };
