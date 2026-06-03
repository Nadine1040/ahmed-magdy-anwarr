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
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-router-dom")
            ) {
              return "vendor";
            }
            if (id.includes("i18next")) {
              return "i18n";
            }
            if (id.includes("lucide-react")) {
              return "ui";
            }
          }
        },
      },
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 500,
  },
});