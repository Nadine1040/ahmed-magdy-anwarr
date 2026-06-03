import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __BASE_PATH__: JSON.stringify(""),
  },
  build: {
    // Split vendor libraries into separate chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          i18n: ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          ui: ["lucide-react"],
        },
      },
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 500,
  },
});