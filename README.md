# wtchxp

Windows XP themed components for [SolidJS](https://www.solidjs.com/), built on
[Kobalte](https://kobalte.dev/) and styled with the XP.css skin plus
[StyleX](https://stylexjs.com/).

The library keeps the original XP.css class names (`button`, `window`,
`title-bar`, `field-row`, `tree-view`, …), so the existing CSS remains the skin
and can be overridden or extended like normal CSS.

> Requires Solid 2 RC (`solid-js@2.0.0-rc.16`) and its matching
> `@solidjs/web` runtime.

## Install

```bash
pnpm add wtchxp solid-js @solidjs/web @kobalte/core
```

The package ships the skin separately so it stays tree-shakeable:

```ts
import "wtchxp/styles";
```

If your toolchain can import CSS files directly, `import "wtchxp/styles.css"`
also works (add a `*.css` module declaration if TypeScript asks for one).

The stylesheet bundles the Pixelated MS Sans Serif font and all XP icons.
Components add only their structural/layout styles through StyleX; the XP look
comes from the CSS skin.

## Components

| Area       | Exports                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Buttons    | `Button`                                                                                                               |
| Windows    | `Window`, `TitleBar`, `TitleBarText`, `TitleBarControls`, `WindowBody`, `StatusBar`, `StatusBarField`, `WindowControl` |
| Layout     | `GroupBox`, `FieldRow`, `FieldRowStacked`                                                                              |
| Forms      | `Checkbox`, `RadioGroup`, `Radio`, `TextField`, `Select`, `Range`, `ProgressBar`                                       |
| Navigation | `Tabs`, `TabList`, `Tab`, `TabPanel`, `TreeView`, `TreeItem`                                                           |

## Usage

```tsx
import { render } from "@solidjs/web";
import { createSignal } from "solid-js";
import {
  Button,
  FieldRow,
  GroupBox,
  TitleBar,
  TitleBarControls,
  TitleBarText,
  Window,
  WindowBody,
  WindowControl,
} from "wtchxp";
import "wtchxp/styles.css";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <Window>
      <TitleBar>
        <TitleBarText>Counter</TitleBarText>
        <TitleBarControls>
          <WindowControl action="Minimize" />
          <WindowControl action="Close" />
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
<Select label="Theme" value={theme()} onChange={(event) => setTheme(event.currentTarget.value)}>
  <option value="xp">Windows XP</option>
</Select>
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

## Development

```bash
vp install
vp dev              # demo at http://localhost:5173
vp run storybook    # component explorer at http://localhost:6006
vp run build-storybook
vp test             # Vitest in browser mode (Playwright/Chromium)
vp check            # formatting, linting and type checking
vp build            # dist/index.js, dist/styles.css and d.ts files
```

Component conventions are documented in [`CODE_STYLE.md`](./CODE_STYLE.md).

The demo lives in `demo/main.tsx` and uses every component. Stories live next
to their components as `src/**/*.stories.tsx`; the Storybook configuration is in
`.storybook/` and uses `storybook-solidjs-vite` with the same Vite/StyleX setup
as the library. `src/styles.css` imports the global skin files,
`src/variables/variables.stylex.ts` defines the theme tokens, and
`src/styles/base.css` contains the structural rules that the theme files do not
provide.

StyleX runs in `application-order` mode. The default `property-specificity`
mode drops shorthand properties such as `border` and `background`, which this
skin relies on.

## Credits

The skin is derived from [XP.css](https://github.com/botoxparty/XP.css) by Adam
Hammad and Jordan Scales (MIT). The bundled icons and MS Sans Serif webfonts
come from the same project. See `LICENSE-XP.CSS` for the original notice.
