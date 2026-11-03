import solid from "@solidjs/vite-plugin";
import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vite-plus";

// Server-rendering smoke tests run in Node instead of the browser project in
// vite.config.ts. `vp run test:ssr` uses this config.
export default defineConfig({
  plugins: [stylex.vite({ styleResolution: "application-order" }), solid()],
  test: {
    environment: "node",
    include: ["tests/ssr.test.tsx"],
    teardownTimeout: 1000,
  },
});
