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
      // Keep one output module per source module. A single bundled entry makes
      // consumers keep every external import (Kobalte, StyleX helpers) even
      // when they only use one component. Preserving modules lets the
      // consumer's bundler drop unused components and their dependencies.
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
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
    include: ["src/**/*.test.tsx", "tests/a11y.test.tsx", "tests/visual.test.tsx"],
  },
  lint: {
    plugins: ["typescript", "oxc", "unicorn", "react"],
    jsPlugins: ["./lint/component-props.js"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      "typescript/consistent-type-definitions": ["error", "type"],
      "wtchxp/component-props-name": "error",
      "wtchxp/use-component-props": "error",
      // Solid components follow the same shape as React components: a
      // capitalized function that returns JSX must be an arrow function.
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
    },
  },
  fmt: {},
});
