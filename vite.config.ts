import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @use "@/assets/scss/_mixins.scss" as *;
            @use "@/assets/scss/_variables.scss" as *;
            `,
        api: "modern",
      },
    },
  },

  server: {
    port: 5173,
    host: true,
    // strictPort: true,
    // watch: {
    //   usePolling: true,
    // },
    proxy: {
      "/api/crm": {
        target: "http://crm.renault-s.ru", // Целевой сервер
        changeOrigin: true, // Меняет заголовок Origin
        rewrite: (path) => path.replace(/^\/api\/crm/, "/expo/api/deal/add"),
        secure: false, // Отключает проверку SSL (если это необходимо)
      },
    },
  },
});
