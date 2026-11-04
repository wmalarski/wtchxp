import stylex from "@stylexjs/unplugin";
import solid from "@solidjs/vite-plugin";
import { build } from "vite-plus";

// Run one isolated build per stylesheet. The StyleX plugin accumulates rules
// for the lifetime of a build process, so reusing one process would leak every
// previously built component's CSS into the next component's stylesheet.
const name = process.env.STYLE_NAME;
const entry = process.env.STYLE_ENTRY;
const outDir = process.env.STYLE_OUT;

if (!name || !entry || !outDir) {
  throw new Error("STYLE_NAME, STYLE_ENTRY and STYLE_OUT are required");
}

await build({
  configFile: false,
  root: process.cwd(),
  logLevel: "silent",
  plugins: [stylex.vite({ styleResolution: "application-order" }), solid()],
  build: {
    outDir,
    emptyOutDir: true,
    // A `.css` entry (the global skin) is itself a stylesheet and must be
    // built with CSS splitting on; the merged single-asset mode below only
    // applies to JS entries (components, tokens).
    cssCodeSplit: entry.endsWith(".css"),
    lib: {
      entry: { [name]: entry },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: name,
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
});
