import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      "/todos": {
        target: "http://localhost:9898",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
