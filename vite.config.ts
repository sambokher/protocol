import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/app",
  plugins: [react()],
  build: {
    outDir: "out/pb_public/app",
    sourcemap: false,
  },
});
