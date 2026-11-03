# wtchxp

Windows XP themed components for [SolidJS](https://www.solidjs.com/), built on
[Kobalte](https://kobalte.dev/) and styled with the XP.css skin plus
[StyleX](https://stylexjs.com/).

The library recreates the XP.css skin with StyleX and scoped CSS modules.
Component class names are hashed, so the skin cannot clash with application
CSS; theme through the exported StyleX tokens instead.

> Requires Solid 2 RC (`solid-js@2.0.0-rc.16`) and its matching
> `@solidjs/web` runtime.

## Install

```bash
pnpm add wtchxp solid-js @solidjs/web @kobalte/core
```

The package imports the stylesheet for a component when that component is
imported, so there is no global skin import to remember. The shared base
stylesheet (fonts and scrollbars from `src/scrollbar/scrollbar.css`) is emitted
once; each
component gets its own stylesheet, so an app that only uses `Button` does not
download window, form or navigation CSS.

If you manage stylesheets yourself (for example to control the load order or
place the skin in a CSS layer), the base skin is also available explicitly:

```ts
import "wtchxp/styles";
```

`import "wtchxp/styles.css"` is equivalent (add a `*.css` module declaration if
TypeScript asks for one). Per-component styles are available under
`wtchxp/components/<name>.css`, for example:

```ts
import "wtchxp/styles.css";
import "wtchxp/components/button.css";
```

The base stylesheet bundles the Pixelated MS Sans Serif font and the icons that
must live in CSS (scrollbars, native select and range internals). The font is
shipped as WOFF2 only; browsers without WOFF2 support fall back to Arial. CSS
icons are inlined as data URLs in the stylesheet of the component that paints
them, so the colocated `<component>/icons/*.svg` assets do not produce extra
image requests. Icons rendered
in the DOM, such as the title bar controls, are inline SVG Solid components so
they ship with their component instead of the global stylesheet. Components
define their layout and skin styles with StyleX, using colocated CSS modules only
for rules StyleX cannot express, such as a bundler asset URL or switching inline
SVG states on `:hover`/`:active`.

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
<Range min={0} max={100} value={level()} onInput={(event) => setLevel(Number(event.currentTarget.value))} />
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
development-only and is not part of the published package.

Kobalte's tab collection also emits an `EFFECT_RELAY_TEAR` warning when tab
items register. It measures DOM order outside the reactive graph; Solid reports
that as a one-frame tear. It is expected for this kind of measurement and does
not affect the rendered tabs.

## Bundle size and tree shaking

The published build keeps one module per source module instead of bundling
everything into a single `index.js`. A consumer bundler can therefore drop
unused components, their Kobalte imports and their styles. Component styles are
emitted next to each component and imported by that component's module; the
base skin and StyleX tokens are emitted once in `dist/styles.css`.

Title bar icons are one SVG module per action. Use the statically typed
`MinimizeControl`, `MaximizeControl`, `RestoreControl`, `HelpControl` and
`CloseControl` components when bundle size matters: each imports exactly one
icon. The `WindowControl action="…"` form is convenient but its dynamic lookup
has to keep all five icons, so prefer the static controls in applications.

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
`backgroundColors`, `shadows` and `radii`; colors, spacing, borders and
component measurements have their own groups. Use the tokens in `stylex.create`
calls instead of hard-coded values, and override them per subtree with
`stylex.createTheme`.

## Development

```bash
vp install
vp dev              # demo at http://localhost:5173
vp run storybook    # component explorer at http://localhost:6006
vp run build-storybook
vp test             # Vitest in browser mode (Playwright/Chromium)
vp check            # formatting, linting and type checking
vp run build        # tree-shakeable dist modules, per-component CSS and d.ts files
vp run verify:bundle # build size budgets + tree-shaking fixtures
vp run generate:icons # regenerate title bar icons from src/window/icons
```

Component conventions are documented in [`CODE_STYLE.md`](./CODE_STYLE.md).

The demo lives in `demo/main.tsx` and uses every component. Stories live next
to their components as `src/**/*.stories.tsx`; the Storybook configuration is in
`.storybook/` and uses `storybook-solidjs-vite` with the same Vite/StyleX setup
as the library. `src/styles.css` is the base global stylesheet (fonts),
`src/scrollbar/scrollbar.css` holds the scrollbar skin,
`src/variables/variables.stylex.ts` defines the theme tokens, and
component-specific CSS lives next to each component as `*.module.css`.

StyleX runs in `application-order` mode. The default `property-specificity`
mode drops shorthand properties such as `border` and `background`, which this
skin relies on.

## Credits

The skin is derived from [XP.css](https://github.com/botoxparty/XP.css) by Adam
Hammad and Jordan Scales (MIT). The bundled icons and MS Sans Serif webfonts
come from the same project. See `LICENSE-XP.CSS` for the original notice.
