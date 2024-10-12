// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    outDir: "out/pb_public", // Custom output directory
    sourcemap: false,
  },
  envDir: ".",
  base: '/',
}));