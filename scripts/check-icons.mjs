import { execFileSync } from "node:child_process";

// Regenerate the title bar assets and fail if the checked-in output differs.
// Run this after changing `src/window/icons/*.svg` and commit the result.
execFileSync(process.execPath, ["scripts/generate-window-icons.mjs"], { stdio: "inherit" });

const status = execFileSync("git", ["status", "--porcelain", "--", "src/window/icons"], {
  encoding: "utf8",
});

if (status.trim().length > 0) {
  console.error("Generated window icons are out of date:\n");
  console.error(status);
  process.exit(1);
}

console.log("Window icons are up to date.");
