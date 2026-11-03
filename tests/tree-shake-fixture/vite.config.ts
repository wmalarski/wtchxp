import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: false,
  },
});
