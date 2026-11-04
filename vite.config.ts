import solid from "@solidjs/vite-plugin";
import stylex from "@stylexjs/unplugin";
import { playwright } from "@vitest/browser-playwright";
import solidLint from "eslint-plugin-solid/configs/v2-strict";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [
    // `property-specificity` (the StyleX default) drops shorthand properties
    // such as `border` and `background`, which this skin relies on.
    stylex.vite({ styleResolution: "application-order" }),
    // `@solidjs/diagnostics` is a dev dependency, so the diagnostics endpoint
    // at `/__solid/diagnostics` is enabled automatically in `vp dev`.
    solid({ diagnostics: true }),
  ],
  pack: {
    // Re-export-only entries are dropped when they are not listed explicitly,
    // which would leave `dist/<component>/index.js` missing. List every public
    // index module so `preserveModules`-style output stays complete.
    entry: ["src/index.ts", "src/*/index.ts"],
    // Browser library, not Node: `neutral` resolves dependencies through
    // `exports` only and keeps `.js` extensions (the `node` default emits
    // `.mjs`). Not the tsdown default, so state it.
    platform: "neutral",
    // tsdown does not minify by default; the previous Vite build did.
    minify: true,
    dts: true,
    // Keep one output module per source module. A single bundled entry makes
    // consumers keep every external import (Kobalte, StyleX helpers) even
    // when they only use one component. Unbundling lets the consumer's
    // bundler drop unused components and their dependencies.
    unbundle: true,
    // Inline title-bar PNGs as data URLs, matching the previous Vite build.
    loader: { ".png": "dataurl", ".woff2": "dataurl" },
    css: {
      // Pack's own CSS output is discarded by `scripts/build-styles.mjs`,
      // which owns the published stylesheets: the StyleX rolldown plugin
      // accumulates rules process-wide and flushes them in nondeterministic
      // order, so `vp pack` cannot emit the shipped stylesheet itself.
      // PostCSS matches the transformer of the separate stylesheet builds
      // there (Vite's default); the tsdown default, Lightning CSS, parses
      // and minifies the discarded CSS differently.
      transformer: "postcss",
    },
    plugins: [
      stylex.rolldown({ styleResolution: "application-order" }),
      // tsdown runs Vite plugins at runtime, but their plugin types do not
      // line up with Rolldown's.
      solid() as never,
    ],
  },
  // The demo page is collocated with its source under tests/demo instead of
  // living at the project root, so point the dev server at it.
  server: {
    open: "/tests/demo/",
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
    include: [
      "src/**/*.test.tsx",
      "tests/a11y.test.tsx",
      "tests/diagnostics.test.tsx",
      "tests/visual.test.tsx",
    ],
  },
  lint: {
    plugins: ["typescript", "oxc", "unicorn", "react"],
    jsPlugins: ["./lint/component-props.js", "eslint-plugin-solid"],
    settings: solidLint.settings,
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      ...solidLint.rules,
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
    overrides: [
      {
        // Tests read signals directly to assert on them after `flush()`; those
        // reads do not need to be in a tracked scope.
        files: ["**/*.test.tsx"],
        rules: {
          "solid/reactivity": "off",
        },
      },
    ],
  },
  fmt: {},
});
