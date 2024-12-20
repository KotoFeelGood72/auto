import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl = env.VITE_API_BASE_URL;

  const isProduction = mode === "production"; // Определяем режим
  return {
    // base: isProduction ? "/wp-content/themes/auto-car-msk/vue/dist/" : "/", // Указываем base только для деплоя
    build: isProduction
      ? {
          rollupOptions: {
            output: {
              manualChunks: () => "main.js",
              entryFileNames: "assets/[name].js",
              chunkFileNames: "assets/[name].js",
              assetFileNames: "assets/[name].[ext]",
            },
          },
          cssCodeSplit: false,
        }
      : {}, // Пустые настройки для режима разработки
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
      proxy: isProduction
        ? undefined
        : {
            "/api/wp": {
              target: "https://autocarmsk.ru/wp-content/uploads/json",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api\/wp/, ""),
            },
            "/api/crm": {
              target: "http://crm.renault-s.ru",
              changeOrigin: true,
              rewrite: (path) =>
                path.replace(/^\/api\/crm/, "/expo/api/deal/add"),
              secure: false,
            },
          },
    },
  };
});
