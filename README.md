# wtchxp

Windows XP themed components for [SolidJS](https://www.solidjs.com/), built on
[Kobalte](https://kobalte.dev/) and styled with the XP.css skin plus
[StyleX](https://stylexjs.com/).

The library recreates the XP.css skin with StyleX and global component
rules. Every class name those rules declare carries the `wt-` prefix, so the
skin cannot clash with application CSS; theme through the exported StyleX
tokens instead.

> Requires Solid 2 RC (`solid-js@2.0.0-rc.16`) and its matching
> `@solidjs/web` runtime.

## Install

```bash
pnpm add wtchxp solid-js @solidjs/web @kobalte/core @stylexjs/stylex
```

The package imports the stylesheet for a component when that component is
imported, so there is no global skin import to remember. The whole library
compiles to one stylesheet: font faces, the XP scrollbar skin, the `wt-`
prefixed component rules, the StyleX rules and the theme tokens. StyleX
collects rules globally, so the sheet ships as a unit — what stays granular
is the JavaScript: an app that only uses `Button` never loads window, form or
navigation code.

The scrollbar skin ships in the base stylesheet because it is part of the XP
look. It targets global pseudo-elements (`::-webkit-scrollbar`), so every
scrollbar in the page picks it up. If you manage stylesheets yourself (for
example to control the load order or place the skin in a CSS layer), the base
skin is also available explicitly:

```ts
import "wtchxp/styles.css";
```

Add a `*.css` module declaration if TypeScript asks for one (Vite-based apps
get it from `vite/client`).

Component code is also exposed through subpaths, which avoids the root barrel
when a consumer cannot tree-shake it:

```ts
import { Button } from "wtchxp/components/button";
```

> Component modules import their CSS. Use a bundler that understands CSS
> imports (Vite, webpack, and similar); importing the package directly in Node
> without a CSS loader is not supported.

The base stylesheet contains the Pixelated MS Sans Serif font, the StyleX
token definitions, the scrollbar skin with its icons and the component
`.css` files imported by `src/styles.css` (icon custom properties and
selector rules StyleX cannot express).
The font is shipped as WOFF2 only; browsers without WOFF2 support fall back to
Arial. CSS icons are inlined as data URLs in the stylesheet carrying the rule
that paints them, so the colocated `<component>/icons/*.svg` assets do not
produce extra image requests. Title bar icons are generated as small PNGs per
interaction state and imported by each statically typed control, so a control
does not carry the other actions' artwork. Components define their layout and
skin styles with StyleX, using colocated `*.css` files only for rules StyleX
cannot express, such as a bundler asset URL or switching image states on
`:hover`/`:active`.

## Components

| Area       | Exports                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| Buttons    | `Button`                                                                                                                    |
| Windows    | `Window`, `TitleBar`, `TitleBarText`, `TitleBarControls`, `WindowBody`, `StatusBar`, `StatusBarField`                       |
| Controls   | `MinimizeControl`, `MaximizeControl`, `RestoreControl`, `HelpControl`, `CloseControl`, `WindowControl`, `WindowControlBase` |
| Icons      | `MinimizeIcon`, `MaximizeIcon`, `RestoreIcon`, `HelpIcon`, `CloseIcon`                                                      |
| Layout     | `GroupBox`, `FieldRow`, `FieldRowStacked`                                                                                   |
| Forms      | `Checkbox`, `RadioGroup`, `Radio`, `TextField`, `Select`, `Range`, `ProgressBar`                                            |
| Navigation | `Tabs`, `TabList`, `Tab`, `TabPanel`, `TreeView`, `TreeItem`                                                                |

## Usage

```tsx
import { render } from "@solidjs/web";
import { createSignal } from "solid-js";
import {
  Button,
  CloseControl,
  FieldRow,
  GroupBox,
  MinimizeControl,
  TitleBar,
  TitleBarControls,
  TitleBarText,
  Window,
  WindowBody,
} from "wtchxp";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <Window>
      <TitleBar>
        <TitleBarText>Counter</TitleBarText>
        <TitleBarControls>
          <MinimizeControl />
          <CloseControl />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>
        <GroupBox legend="Clicks">
          <FieldRow>
            <Button onClick={() => setCount(count() + 1)}>Click me</Button>
            <span>Clicked {count()} times</span>
          </FieldRow>
        </GroupBox>
      </WindowBody>
    </Window>
  );
}

render(() => <App />, document.getElementById("root")!);
```

### Forms

Kobalte drives the accessible behaviour; the XP markup contract is preserved.

```tsx
<Checkbox
  checked={checked()}
  onChange={setChecked}
  label="Enable system sounds"
  description="Plays a sound when an alert is shown."
/>

<RadioGroup label="Assignment" value={value()} onChange={setValue}>
  <Radio value="work" label="Work" />
  <Radio value="home" label="Home" />
</RadioGroup>

<TextField label="Installation path" value={path()} onChange={setPath} />
<Select label="Theme" options={["Windows XP", "Windows Classic"]} value={theme()} onChange={setTheme} />
<Range
  label="Volume"
  description="Controls the output level."
  min={0}
  max={100}
  value={level()}
  onInput={(event) => setLevel(Number(event.currentTarget.value))}
/>
<ProgressBar value={level()} label="Disk usage" />
```

### Tabs and trees

```tsx
<Tabs defaultValue="controls">
  <TabList>
    <Tab value="controls">Controls</Tab>
    <Tab value="data">Data</Tab>
  </TabList>
  <TabPanel value="controls">…</TabPanel>
  <TabPanel value="data">…</TabPanel>
</Tabs>

<TreeView label="Files">
  <TreeItem label="Desktop">
    <TreeItem label="readme.txt" selected onSelect={() => {}} />
  </TreeItem>
</TreeView>
```

`TabList` renders `<menu role="tablist">`, which is what the XP tab CSS targets.
`TreeItem` uses native `<details>/<summary>` for branches and anchors for leaves.

## Kobalte alpha notes

`@kobalte/core` 2.0.0-alpha.4 still reads a few props outside a tracking scope
in its text-field implementation. This repo patches those reads through pnpm's
`patchedDependencies` (see `patches/@kobalte__core@2.0.0-alpha.4.patch`) so the
demo and tests stay clean under Solid 2's strict diagnostics. The patch is
development-only and is not part of the published package. Consumers using the
same Kobalte alpha need to apply the equivalent patch themselves (or tolerate
the warnings) until Kobalte includes the fix.

Kobalte's tab collection also emits `EFFECT_RELAY_TEAR` and
`EFFECT_WRITES_OWN_SOURCE` warnings when tab items register and panels mount. It
measures DOM order outside the reactive graph; Solid reports the relay as a
one-frame tear. It is expected for this kind of measurement and does not affect
the rendered tabs, so the no-diagnostics gate in
`tests/diagnostics.test.tsx` covers the components whose reactivity this package
owns.

## Bundle size and tree shaking

The published build runs `vp pack` in unbundle mode (tsdown), so `dist/`
mirrors `src/` instead of bundling everything into a single `index.js`. A
consumer bundler can therefore drop unused components and their Kobalte
imports. All styling lives in one `dist/styles.css` that every component
module pulls in through the shared `sx` helper: StyleX compiles to a single
global stylesheet by design, so CSS is shipped as a unit (skin, scrollbar
skin, component rules, tokens) while the JavaScript stays tree-shakeable.
Component subpaths such as `wtchxp/components/button` resolve to the matching
`dist/<component>/index.js`.

Title bar icons are generated as one module per action, and each statically
typed `MinimizeControl`, `MaximizeControl`, `RestoreControl`, `HelpControl` and
`CloseControl` imports only its own PNG states. The `WindowControl action="…"`
form is convenient but its dynamic lookup has to keep all five icons, so prefer
the static controls in applications.

The repository checks both sides of that contract:

```bash
vp run check:bundle          # dist JS/CSS raw and gzip budgets (build first)
vp run verify:bundle         # build, then run size and tree-shaking checks
```

`verify:bundle` builds `tests/tree-shake-fixture` as a small Solid app. The
fixture uses a subset of the library and the check fails if the output has more
than one CSS file, contains an unused component or icon, imports an unrelated
Kobalte subpath, or exceeds its size budget. The app output should contain one
JS bundle and one merged stylesheet.

## Theming

Design tokens live in `src/variables/variables.stylex.ts` and are exported from
the package root. Typography is split into `fonts`, `fontSizes`, `fontWeights`,
`lineHeights`, `textColors` and `textShadows`. Surfaces use `backgrounds`,
`backgroundColors`, `shadows` and `radii`; colors, spacing, tabs and component
measurements have their own groups. Use the tokens in `stylex.create`
calls instead of hard-coded values, and override them per subtree with
`stylex.createTheme`.

## Development

```bash
vp install
vp dev              # demo at http://localhost:5173/tests/demo/
vp run storybook    # component explorer at http://localhost:6006
vp run build-storybook
vp run test         # browser + SSR tests
vp run test:ssr     # server-rendering smoke test only
vp check            # formatting, linting and type checking
vp run build        # vp pack: JS, d.ts and the single stylesheet
vp run verify:bundle # build size budgets + tree-shaking fixtures
vp run generate:icons # regenerate title bar icons from src/window/icons
vp run check:icons    # verify generated title bar assets are up to date
```

Component conventions are documented in [`CODE_STYLE.md`](./CODE_STYLE.md).

Browser tests cover component behavior, axe accessibility checks and
computed-style regressions for the skin. `tests/ssr.test.tsx` renders the window
composition with `renderToString` through `vitest.ssr.config.ts`.

Reactive behavior is covered by `tests/diagnostics.test.tsx`, which uses
`@solidjs/diagnostics` to assert that interactions produce no Solid diagnostics.
While `vp dev` is running, `POST /__solid/diagnostics` exposes the same channels
for out-of-process checks (`begin`, `active`, `whyDidRun`, `costs`, `end`).
Linting uses `eslint-plugin-solid`'s `v2-strict` configuration on top of the
project rules, so `vp check` catches destructured props, removed Solid 1.x APIs
and the other common reactivity mistakes.

The demo lives in `tests/demo/main.tsx` and uses every component. Stories live
next to their components as `src/**/*.stories.tsx`; the Storybook configuration
is in `.storybook/` and uses `storybook-solidjs-vite` with the same Vite/StyleX setup
as the library. Pushes to `master` deploy the static Storybook build to GitHub
Pages (`.github/workflows/deploy-storybook.yml`), published at
<https://wmalarski.github.io/wtchxp/>. In the repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions** once before the
first deployment. `src/styles.css` is the base global stylesheet (fonts) and `@import`s
`src/scrollbar/scrollbar.css` (the XP scrollbar skin) plus every component's
colocated `<component>.css`, `src/variables/variables.stylex.ts` defines the
theme tokens, and StyleX handles the rest of the component styling.
`vp run generate:icons` regenerates the title bar PNGs and SVG-backed icon
components with Playwright/Chromium.

StyleX runs in `application-order` mode. The default `property-specificity`
mode drops shorthand properties such as `border` and `background`, which this
skin relies on.

## Credits

The skin is derived from [XP.css](https://github.com/botoxparty/XP.css) by Adam
Hammad and Jordan Scales (MIT). The bundled icons and MS Sans Serif webfonts
come from the same project. See `LICENSE-XP.CSS` for the original notice.
