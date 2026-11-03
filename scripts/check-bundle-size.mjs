import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const dist = join(process.cwd(), "dist");
const kib = (bytes) => `${(bytes / 1024).toFixed(2)} kB`;

const checkFile = (file, limits) => {
  const path = join(dist, file);

  if (!existsSync(path)) {
    throw new Error(`Missing build artifact: ${file}`);
  }

  const size = statSync(path).size;
  const gzip = gzipSync(readFileSync(path)).byteLength;

  if (size > limits.raw) {
    throw new Error(`${file}: ${kib(size)} exceeds the ${kib(limits.raw)} raw budget`);
  }

  if (gzip > limits.gzip) {
    throw new Error(`${file}: ${kib(gzip)} gzip exceeds the ${kib(limits.gzip)} gzip budget`);
  }

  return { file, size, gzip };
};

const checkTotal = (files, limits, label) => {
  let size = 0;
  let gzip = 0;

  for (const file of files) {
    const contents = readFileSync(join(dist, file));
    size += contents.byteLength;
    gzip += gzipSync(contents).byteLength;
  }

  if (size > limits.raw) {
    throw new Error(`${label}: ${kib(size)} exceeds the ${kib(limits.raw)} raw budget`);
  }

  if (gzip > limits.gzip) {
    throw new Error(`${label}: ${kib(gzip)} gzip exceeds the ${kib(limits.gzip)} gzip budget`);
  }

  return { size, gzip };
};

const componentDirs = readdirSync(dist, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(dist, entry.name, "styles.css")))
  .map((entry) => entry.name);

const jsFiles = readdirSync(dist, { recursive: true })
  .filter((file) => typeof file === "string" && file.endsWith(".js"))
  .map((file) => file.replaceAll("\\", "/"));

const jsFilesIn = (directory) =>
  readdirSync(join(dist, directory), { recursive: true })
    .filter((file) => typeof file === "string" && file.endsWith(".js"))
    .map((file) => `${directory}/${String(file)}`.replaceAll("\\", "/"));

const cssFiles = readdirSync(dist, { recursive: true })
  .filter((file) => typeof file === "string" && file.endsWith(".css"))
  .map((file) => file.replaceAll("\\", "/"));

const results = [
  checkFile("index.js", { raw: 8 * 1024, gzip: 3 * 1024 }),
  checkFile("styles.css", { raw: 28 * 1024, gzip: 15 * 1024 }),
  checkFile("scrollbars.css", { raw: 36 * 1024, gzip: 6 * 1024 }),
];

for (const component of componentDirs) {
  results.push(checkFile(`${component}/styles.css`, { raw: 24 * 1024, gzip: 5 * 1024 }));
  results.push(checkFile(`${component}/index.js`, { raw: 4 * 1024, gzip: 2 * 1024 }));
}

for (const component of componentDirs) {
  const files = jsFilesIn(component).filter(
    (file) => component !== "window" || !file.startsWith("window/icons/"),
  );
  const total = checkTotal(files, { raw: 20 * 1024, gzip: 8 * 1024 }, `${component} JavaScript`);
  console.log(`${component} JavaScript: ${kib(total.size)} (${kib(total.gzip)} gzip)`);
}

const iconJs = checkTotal(
  jsFilesIn("window/icons"),
  { raw: 40 * 1024, gzip: 24 * 1024 },
  "Window icon JavaScript",
);
console.log(`window icons JavaScript: ${kib(iconJs.size)} (${kib(iconJs.gzip)} gzip)`);

const jsTotal = checkTotal(jsFiles, { raw: 150 * 1024, gzip: 55 * 1024 }, "JavaScript");
const cssTotal = checkTotal(cssFiles, { raw: 130 * 1024, gzip: 34 * 1024 }, "CSS");

for (const result of results) {
  console.log(`${result.file}: ${kib(result.size)} (${kib(result.gzip)} gzip)`);
}

console.log(`JavaScript total: ${kib(jsTotal.size)} (${kib(jsTotal.gzip)} gzip)`);
console.log(`CSS total: ${kib(cssTotal.size)} (${kib(cssTotal.gzip)} gzip)`);
console.log("Bundle size check passed.");
