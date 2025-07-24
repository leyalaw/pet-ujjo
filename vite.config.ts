import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@commonComponents": "/src/components/common",
      "@components": "/src/components",
      "@helpers": "/src/helpers",
      "@home": "/src/views/home",
      "@layout": "/src/layout",
      "@svg": "/src/components/svg",
    },
  },
});
