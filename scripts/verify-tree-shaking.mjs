import { execFileSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const fixture = join(root, "tests", "tree-shake-fixture");
const fixtureDist = join(fixture, "dist");
const vp = join(root, "node_modules", ".bin", process.platform === "win32" ? "vp.cmd" : "vp");

const kib = (bytes) => `${(bytes / 1024).toFixed(2)} kB`;

const findFiles = (directory, extension) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory()
      ? findFiles(path, extension)
      : path.endsWith(extension)
        ? [path]
        : [];
  });

const assertIncludes = (name, contents, markers) => {
  for (const marker of markers) {
    if (!contents.includes(marker)) {
      throw new Error(`${name}: expected output to contain ${marker}`);
    }
  }
};

const assertExcludes = (name, contents, markers) => {
  for (const marker of markers) {
    if (contents.includes(marker)) {
      throw new Error(`${name}: output unexpectedly contains ${marker}`);
    }
  }
};

if (!existsSync(join(root, "dist", "index.js"))) {
  throw new Error("dist/index.js is missing. Run `vp run build` before verifying tree shaking.");
}

const nodeModules = join(fixture, "node_modules");
const fixturePackage = join(nodeModules, "wtchxp");
mkdirSync(nodeModules, { recursive: true });

if (existsSync(fixturePackage)) {
  const stat = lstatSync(fixturePackage);
  if (!stat.isSymbolicLink()) {
    throw new Error(`${fixturePackage} exists and is not a symlink`);
  }
  rmSync(fixturePackage);
}

symlinkSync(root, fixturePackage, "dir");
rmSync(fixtureDist, { recursive: true, force: true });

execFileSync(vp, ["build"], {
  cwd: fixture,
  stdio: "pipe",
});

const jsFiles = findFiles(fixtureDist, ".js");
const cssFiles = findFiles(fixtureDist, ".css");
const html = readFileSync(join(fixtureDist, "index.html"), "utf8");

if (jsFiles.length !== 1) {
  throw new Error(`Expected one JS bundle for the app, found ${jsFiles.length}`);
}

if (cssFiles.length !== 1) {
  throw new Error(
    `Expected all component CSS in one file, found ${cssFiles.length}: ${cssFiles.join(", ")}`,
  );
}

const stylesheetLinks = html.match(/<link[^>]+rel="stylesheet"[^>]*>/g) ?? [];

if (stylesheetLinks.length !== 1) {
  throw new Error(`Expected one stylesheet link in index.html, found ${stylesheetLinks.length}`);
}

const js = readFileSync(jsFiles[0], "utf8");
const css = readFileSync(cssFiles[0], "utf8");

// Components used by the fixture app.
assertIncludes("JavaScript", js, [
  "dist/button/button.js",
  "dist/checkbox/checkbox.js",
  "dist/group-box/group-box.js",
  "dist/window/window.js",
  "dist/window/window-control-base.js",
  "dist/window/icons/close-icon.js",
  "@kobalte/core/dist/checkbox",
]);

// Components and icons the fixture does not use.
assertExcludes("JavaScript", js, [
  "dist/field/field.js",
  "dist/progress-bar/progress-bar.js",
  "dist/radio/radio.js",
  "dist/range/range.js",
  "dist/select/select.js",
  "dist/tabs/tabs.js",
  "dist/text-field/text-field.js",
  "dist/tree-view/tree-view.js",
  "dist/window/icons/help-icon.js",
  "dist/window/icons/maximize-icon.js",
  "dist/window/icons/minimize-icon.js",
  "dist/window/icons/restore-icon.js",
  "dist/window/window-control.js",
  "@kobalte/core/dist/radio-group",
  "@kobalte/core/dist/select",
  "@kobalte/core/dist/tabs",
  "@kobalte/core/dist/text-field",
]);

// The app uses Button, Checkbox, GroupBox and Window. CSS from those
// components should be merged into the single app stylesheet, while unused
// component CSS should be absent.
assertIncludes("CSS", css, [
  "75px",
  "_window-control_",
  "_checkbox-label_",
  "--xp-checkbox-icon",
  "_field-row_",
]);

assertExcludes("CSS", css, [
  "_xp-select_",
  "_radio-label_",
  "--xp-range-thumb",
  "@keyframes xhtld8h-B",
]);

const jsRaw = readFileSync(jsFiles[0]).byteLength;
const jsGzip = gzipSync(readFileSync(jsFiles[0])).byteLength;
const cssRaw = readFileSync(cssFiles[0]).byteLength;
const cssGzip = gzipSync(readFileSync(cssFiles[0])).byteLength;

if (jsRaw > 320 * 1024 || jsGzip > 85 * 1024) {
  throw new Error(`Fixture JS exceeds budget: ${kib(jsRaw)} (${kib(jsGzip)} gzip)`);
}

if (cssRaw > 80 * 1024 || cssGzip > 25 * 1024) {
  throw new Error(`Fixture CSS exceeds budget: ${kib(cssRaw)} (${kib(cssGzip)} gzip)`);
}

console.log(`fixture app JS:  ${kib(jsRaw)} (${kib(jsGzip)} gzip)`);
console.log(`fixture app CSS: ${kib(cssRaw)} (${kib(cssGzip)} gzip, 1 file)`);
console.log("Tree shaking verification passed.");
