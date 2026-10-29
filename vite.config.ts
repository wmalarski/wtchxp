import solid from "@solidjs/vite-plugin";
import stylex from "@stylexjs/unplugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [
    // `property-specificity` (the StyleX default) drops shorthand properties
    // such as `border` and `background`, which this skin relies on.
    stylex.vite({ styleResolution: "application-order" }),
    solid(),
  ],
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
        styles: "src/styles-entry.ts",
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: "styles",
    },
    rolldownOptions: {
      external: [
        /^solid-js(\/|$)/,
        /^@solidjs\/web(\/|$)/,
        /^@kobalte\/core(\/|$)/,
        /^@stylexjs\/stylex(\/|$)/,
      ],
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
    setupFiles: ["tests/setup.ts"],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
