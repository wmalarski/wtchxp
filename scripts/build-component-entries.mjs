import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

// `preserveModules` keeps implementation modules but drops re-export-only
// entry modules, so `dist/<component>/index.js` would otherwise be missing.
// Rebuild those JS entry points from the declaration files emitted by tsc.
// Declaration files are the source of truth for the public names of each
// component subpath.
const dist = join(process.cwd(), "dist");

const findIndexDeclarations = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findIndexDeclarations(path);
    return entry.name === "index.d.ts" ? [path] : [];
  });

const resolveSpecifier = (fromDirectory, specifier) => {
  const target = join(fromDirectory, specifier);

  if (existsSync(`${target}.js`)) return `${specifier}.js`;
  if (existsSync(join(target, "index.js"))) {
    return `${specifier.replace(/\/$/, "")}/index.js`;
  }

  throw new Error(`Cannot resolve ${specifier} from ${fromDirectory}`);
};

const parseExports = (source) => {
  const exports = [];
  const pattern = /^\s*export\s+(type\s+)?(?:\{([\s\S]*?)\}|\*)\s+from\s+["']([^"']+)["'];?/gm;

  for (const match of source.matchAll(pattern)) {
    const [, typeOnly, names, specifier] = match;

    // Type-only blocks have no runtime counterpart.
    if (typeOnly) continue;

    if (names === undefined) {
      exports.push({ kind: "all", specifier });
      continue;
    }

    const runtimeNames = names
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0 && !name.startsWith("type "));

    if (runtimeNames.length > 0) {
      exports.push({ kind: "names", names: runtimeNames, specifier });
    }
  }

  return exports;
};

const declarations = findIndexDeclarations(dist)
  .filter((path) => path !== join(dist, "index.d.ts"))
  .sort(
    (a, b) => relative(dist, b).split(/[\\/]/).length - relative(dist, a).split(/[\\/]/).length,
  );

for (const declaration of declarations) {
  const source = readFileSync(declaration, "utf8");
  const parsed = parseExports(source);

  if (parsed.length === 0) {
    throw new Error(`No runtime exports found in ${declaration}`);
  }

  const directory = dirname(declaration);
  const lines = parsed.map((entry) => {
    const resolved = resolveSpecifier(directory, entry.specifier);
    return entry.kind === "all"
      ? `export * from "${resolved}";`
      : `export { ${entry.names.join(", ")} } from "${resolved}";`;
  });

  const target = join(directory, "index.js");
  writeFileSync(
    target,
    `// Generated from ${relative(dist, declaration).replaceAll("\\", "/")} by scripts/build-component-entries.mjs.\n${lines.join("\n")}\n`,
  );
}

console.log(`Generated ${declarations.length} component entry points.`);
