import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL_ASSET || "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: () => "main.js",
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    cssCodeSplit: false,
  },
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
    strictPort: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "https://2klstk.ru/wp-content/uploads/json",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
