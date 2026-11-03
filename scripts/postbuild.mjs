import { writeFileSync } from "node:fs";

// Vite extracts the CSS imported by the style entries and leaves empty JS
// files behind. Point the JS exports at the emitted stylesheets so consumers
// can `import "wtchxp/styles"` or `import "wtchxp/scrollbars"` from JS or
// TypeScript. Component stylesheets are imported by the component modules
// themselves.
writeFileSync("dist/styles.js", 'import "./styles.css";\n');
writeFileSync("dist/scrollbars.js", 'import "./scrollbars.css";\n');
