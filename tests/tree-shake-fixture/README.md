# Tree-shaking fixture

A small Solid app used by `scripts/verify-tree-shaking.mjs`. It imports only the
components it needs and verifies that the app build:

- contains one JavaScript bundle and one merged CSS file;
- includes CSS and JavaScript for `Button`, `Checkbox`, `GroupBox`, `Window` and
  `CloseControl`;
- omits unused components, icons and Kobalte packages.

The fixture disables JS minification so the check can inspect module markers;
CSS is still minified by Vite.

The verification script creates `node_modules/wtchxp` as a symlink to the
repository root, then builds this directory. Run it from the repository root:

```bash
node scripts/verify-tree-shaking.mjs
```

The app is then built into `tests/tree-shake-fixture/dist` (`index.html`,
`assets/index-*.js`, `assets/index-*.css`). To rebuild it manually after the
symlink exists:

```bash
cd tests/tree-shake-fixture
../../node_modules/.bin/vp build
```
