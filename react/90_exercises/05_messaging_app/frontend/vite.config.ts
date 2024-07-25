import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/register": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/login": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/logout": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
