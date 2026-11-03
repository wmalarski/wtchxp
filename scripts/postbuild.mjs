import { writeFileSync } from "node:fs";

// Vite extracts the CSS imported by the styles entry and leaves an empty
// styles.js behind. Point the JS export at the emitted base stylesheet so
// consumers can `import "wtchxp/styles"` from JS or TypeScript. Component
// stylesheets are imported by the component modules themselves.
writeFileSync("dist/styles.js", 'import "./styles.css";\n');
