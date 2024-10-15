// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  build: {
    outDir: "docs", 
    sourcemap: false,
  },
  envDir: ".",
  base: '/protocol',
  resolve: {
    alias: {
      "junokit": "/src/ui-kit", 
    },
  },
  
}));