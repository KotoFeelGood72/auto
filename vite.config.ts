import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // vite: {
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
  // },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       api: "modern-compiler",
  //     },
  //   },
  // },
  server: {
    port: 5173,
    host: true,
    // strictPort: true,
    // watch: {
    //   usePolling: true,
    // },
    proxy: {
      "/api/crm": {
        target: "http://crm.renault-s.ru",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/crm/, "/expo/api/deal/add"),
      },
    },
  },
});
