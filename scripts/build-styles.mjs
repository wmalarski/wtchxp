import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
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
    name: "field",
    entry: "src/field/index.ts",
    owners: ["field/field.js"],
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
  const baseCss = buildCss("base", "src/styles-entry.ts");
  const tokenCss = buildCss("tokens", "src/variables/variables.stylex.ts");
  const scrollbarCss = buildCss("scrollbars", "src/scrollbars-entry.ts");

  // Replace the library-wide stylesheet with the global skin plus one copy of
  // the theme tokens. Component rules are emitted next to their components.
  writeFileSync(join(dist, "styles.css"), `${baseCss}\n${tokenCss}\n`);
  writeFileSync(join(dist, "scrollbars.css"), `${scrollbarCss}\n`);

  for (const component of components) {
    const css = buildCss(component.name, component.entry).replace(tokenRule, "").trim();

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

    // Separate builds must produce the same CSS module hashes as the main JS
    // build. If they drift, the class names in JS would no longer match the
    // emitted rules, so fail the build instead of shipping unstyled markup.
    const componentDir = join(dist, component.name);

    if (readdirSync(componentDir).some((file) => file.endsWith(".module.css.js"))) {
      const moduleClasses = findFiles(componentDir, ".module.css.js").flatMap((file) =>
        readFileSync(file, "utf8").match(/_\w[\w-]*_\w+_\w+/g),
      );
      const componentRules = readFileSync(join(componentDir, "styles.css"), "utf8");

      for (const className of moduleClasses ?? []) {
        if (!componentRules.includes(className)) {
          throw new Error(
            `${component.name}: CSS module class ${className} is missing from styles.css`,
          );
        }
      }
    }
  }
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
