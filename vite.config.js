import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), "@tailwindcss/typography"],

  server: {
    proxy: {
      "/auth": {
        target: "https://ai-agent-backend-b0dh.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
