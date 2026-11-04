import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const dist = join(root, "dist");
const worker = fileURLToPath(new URL("./build-style-entry.mjs", import.meta.url));

/**
 * Each component's CSS entry point and the built modules that should import
 * that stylesheet. Modules are used instead of a single `styles.js` barrel so
 * switching to a component automatically brings its CSS without bringing the
 * CSS of components the app never imports.
 */
const components = [
  {
    name: "button",
    entry: "src/button/index.ts",
    owners: ["button/button.js"],
  },
  {
    name: "checkbox",
    entry: "src/checkbox/index.ts",
    owners: ["checkbox/checkbox.js"],
  },
  {
    name: "group-box",
    entry: "src/group-box/index.ts",
    owners: ["group-box/group-box.js"],
  },
  {
    name: "progress-bar",
    entry: "src/progress-bar/index.ts",
    owners: ["progress-bar/progress-bar.js"],
  },
  {
    name: "radio",
    entry: "src/radio/index.ts",
    owners: ["radio/radio.js"],
  },
  {
    name: "range",
    entry: "src/range/index.ts",
    owners: ["range/range.js"],
  },
  {
    name: "select",
    entry: "src/select/index.ts",
    owners: ["select/select.js"],
  },
  {
    name: "tabs",
    entry: "src/tabs/index.ts",
    owners: ["tabs/tabs.js"],
  },
  {
    name: "text-field",
    entry: "src/text-field/index.ts",
    owners: ["text-field/text-field.js"],
  },
  {
    name: "tree-view",
    entry: "src/tree-view/index.ts",
    owners: ["tree-view/tree-view.js"],
  },
  {
    name: "window",
    entry: "src/window/index.ts",
    owners: ["window/window.js", "window/window-control-base.js"],
  },
];

// StyleX emits theme tokens as `:root, .<hash> { ... }` blocks. They are the
// same in every component build, so keep exactly one copy in the shared base
// stylesheet instead of repeating them in every component CSS file.
const tokenRule = /:root, \.[\w-]+ \{[^}]*\}/g;

// Every source component must have an explicit stylesheet entry. Otherwise a
// new component silently loses its rules when the initial library-wide
// stylesheet is replaced below.
const sourceComponents = readdirSync(join(root, "src"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(root, "src", entry.name, "index.ts")))
  .map((entry) => entry.name)
  .sort();
const configuredComponents = components.map((component) => component.name).sort();
const missingEntries = sourceComponents.filter((name) => !configuredComponents.includes(name));
const staleEntries = configuredComponents.filter((name) => !sourceComponents.includes(name));

if (missingEntries.length > 0 || staleEntries.length > 0) {
  throw new Error(
    [
      missingEntries.length > 0 ? `Missing stylesheet entries: ${missingEntries.join(", ")}` : "",
      staleEntries.length > 0 ? `Stale stylesheet entries: ${staleEntries.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join(". "),
  );
}

for (const component of components) {
  if (!existsSync(join(root, component.entry))) {
    throw new Error(`Missing stylesheet entry file: ${component.entry}`);
  }

  for (const owner of component.owners) {
    if (!existsSync(join(dist, owner))) {
      throw new Error(`Missing stylesheet owner module: ${owner}`);
    }
  }
}

const tempRoot = mkdtempSync(join(tmpdir(), "wtchxp-styles-"));

const findFiles = (directory, extension) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory()
      ? findFiles(path, extension)
      : path.endsWith(extension)
        ? [path]
        : [];
  });

// `vp pack` emits CSS assets for the rules the StyleX plugin collects. Those
// intermediate assets are not part of the published layout; the authoritative
// stylesheets are written below.
for (const file of findFiles(dist, ".css")) {
  rmSync(file, { force: true });
}

const buildCss = (name, entry) => {
  const outDir = join(tempRoot, name);

  execFileSync(process.execPath, [worker], {
    cwd: root,
    env: {
      ...process.env,
      STYLE_NAME: name,
      STYLE_ENTRY: entry,
      STYLE_OUT: outDir,
    },
  });

  const cssFiles = findFiles(outDir, ".css").sort();

  if (cssFiles.length === 0) {
    throw new Error(`No CSS produced for ${entry}`);
  }

  return cssFiles.map((file) => readFileSync(file, "utf8").trim()).join("\n");
};

const relativeSpecifier = (from, to) => {
  const specifier = relative(from, to).replaceAll("\\", "/");
  return specifier.startsWith(".") ? specifier : `./${specifier}`;
};

const prependImport = (file, specifier) => {
  const path = join(dist, file);
  const source = readFileSync(path, "utf8");
  const statement = `import ${JSON.stringify(specifier)};`;

  if (source.includes(statement)) {
    return false;
  }

  writeFileSync(path, `${statement}\n${source}`);
  return true;
};

try {
  // The shared base stylesheet is `src/styles.css` itself; it `@import`s
  // the scrollbar skin and the `wt-` prefixed component skins, so the
  // published sheet is the global skin plus one copy of the theme tokens.
  // The StyleX rules of each component are emitted next to that component.
  const baseCss = buildCss("base", "src/styles.css");
  const tokenCss = buildCss("tokens", "src/variables/variables.stylex.ts");

  writeFileSync(join(dist, "styles.css"), `${baseCss}\n${tokenCss}\n`);

  for (const component of components) {
    const rawCss = buildCss(component.name, component.entry);
    const css = rawCss.replace(tokenRule, "").trim();

    if (new RegExp(tokenRule.source).test(css)) {
      throw new Error(`${component.name}: theme token definitions were not stripped`);
    }

    if (css.length === 0) {
      throw new Error(`Component stylesheet for ${component.name} is empty`);
    }

    writeFileSync(join(dist, component.name, "styles.css"), `${css}\n`);

    for (const owner of component.owners) {
      const ownerDir = dirname(join(dist, owner));
      const componentCss = join(dist, component.name, "styles.css");
      const baseSpecifier = relativeSpecifier(ownerDir, join(dist, "styles.css"));
      const componentSpecifier = relativeSpecifier(ownerDir, componentCss);

      // Prepend in reverse so the base stylesheet stays first in the module.
      prependImport(owner, componentSpecifier);
      prependImport(owner, baseSpecifier);
    }
  }
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
